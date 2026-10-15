const express = require('express');
const cors = require('cors');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // optional, e.g. https://yoursite.com
const PORT = process.env.PORT || 3000;

// Source of truth for this case's pricing — must match data-base / data-challenge
// on #priceBox in index.html. The client's price/coupon values are NEVER trusted.
const BASE_PRICE = 249;
const CHALLENGE = 'last-login';
const COUPON_API = (process.env.COUPON_API_URL || 'https://arena-coupon-code.onrender.com/api/coupon').replace(/\/+$/, '');

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('Missing BOT_TOKEN or CHAT_ID environment variable.');
}

const app = express();
app.set('trust proxy', 1);
app.use(cors(ALLOWED_ORIGIN ? { origin: ALLOWED_ORIGIN.split(',').map(s => s.trim()) } : {}));
app.use(express.json({ limit: '20kb' }));

// Health check (Render + uptime pingers)
app.get('/', (req, res) => res.json({ ok: true, service: 'arena-backend' }));

// Simple in-memory rate limit: 5 requests / 10 min per IP
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}
setInterval(() => hits.clear(), 60 * 60 * 1000).unref();

const esc = v => String(v ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const clip = (v, n) => String(v ?? '').trim().slice(0, n);

// Re-checks the coupon against access-relay (server-to-server). The client's
// own claim of "valid"/discount%/price is never trusted — only this result is.
async function verifyCoupon(code) {
  if (!code) return null;
  try {
    const url = `${COUPON_API}?code=${encodeURIComponent(code)}&challenge=${encodeURIComponent(CHALLENGE)}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const d = await r.json().catch(() => ({}));
    return (d && d.valid && d.discount > 0) ? d : null;
  } catch (e) {
    console.error('Coupon verify failed:', e.message);
    return null;
  }
}

app.post('/api/arena', async (req, res) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) return res.status(500).json({ ok: false, error: 'server_not_configured' });
    if (limited(req.ip)) return res.status(429).json({ ok: false, error: 'too_many_requests' });

    const b = req.body || {};
    const name = clip(b.name, 100);
    const email = clip(b.email, 120);
    const whatsapp = clip(b.whatsapp, 30);
    const code = clip(b.countryCode, 8);
    const occupation = clip(b.occupation, 80);
    const caseName = clip(b.case, 80) || `CA0001 - The Last Login`;

    if (!name || !whatsapp || !occupation || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'invalid_input' });
    }

    // --- Server-side price: never trust b.price / b.originalPrice / b.couponCode as-is ---
    const claimedCoupon = clip(b.couponCode, 32).toUpperCase();
    let finalPrice = BASE_PRICE;
    let priceLine = `💰 <b>Price:</b> INR ${BASE_PRICE}\n`;
    let couponLine = '';

    if (claimedCoupon) {
      const verified = await verifyCoupon(claimedCoupon);
      if (verified) {
        const discount = verified.discount;
        finalPrice = Math.max(0, Math.round(BASE_PRICE * (1 - discount / 100)));
        priceLine = `💰 <b>Price:</b> INR ${finalPrice} <s>INR ${BASE_PRICE}</s>\n`;
        couponLine = `🏷️ <b>Coupon:</b> ${esc(claimedCoupon)} — ${discount}% off ✅ Verified\n`;
      } else {
        // Coupon didn't check out against access-relay — charge full price and flag it,
        // instead of silently trusting whatever the client claimed.
        couponLine = `🏷️ <b>Coupon:</b> ${esc(claimedCoupon)} ⚠️ Invalid / unverified — ignored, full price used\n`;
      }
    }

    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const text =
      `🚨 <b>New Arena Request</b>\n\n` +
      `📁 <b>Case:</b> ${esc(caseName)}\n` +
      priceLine +
      couponLine + `\n` +
      `👤 <b>Name:</b> ${esc(name)}\n` +
      `📧 <b>Email:</b> ${esc(email)}\n` +
      `📱 <b>WhatsApp:</b> ${esc(code)} ${esc(whatsapp)}\n` +
      `💼 <b>Occupation:</b> ${esc(occupation)}\n\n` +
      `🕒 ${esc(time)} IST`;

    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true })
    });
    const data = await tg.json().catch(() => ({}));
    if (!tg.ok || !data.ok) {
      console.error('Telegram error:', data);
      return res.status(502).json({ ok: false, error: 'telegram_failed' });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.listen(PORT, () => console.log('Arena backend running on port ' + PORT));
