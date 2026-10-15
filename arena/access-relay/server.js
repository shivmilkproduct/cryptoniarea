const express = require('express');
const cors = require('cors');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // optional, e.g. https://yoursite.com
const PORT = process.env.PORT || 3000;

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
    const couponCode = clip(b.couponCode, 32);
    const originalPrice = clip(b.originalPrice, 30);

    if (!name || !whatsapp || !occupation || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'invalid_input' });
    }

    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const priceLine = couponCode
      ? `💰 <b>Price:</b> ${esc(clip(b.price, 30))} <i>(was ${esc(originalPrice)})</i>\n🎟 <b>Coupon applied:</b> ${esc(couponCode)}\n\n`
      : `💰 <b>Price:</b> ${esc(clip(b.price, 30))}\n\n`;
    const text =
      `🚨 <b>New Arena Request</b>\n\n` +
      `📁 <b>Case:</b> ${esc(clip(b.case, 80))}\n` +
      priceLine +
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
