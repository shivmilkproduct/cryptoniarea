// Cryptonic Area - WAPT enrollment -> Telegram
// No secrets in this file. Set these in Render > Environment:
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ALLOWED_ORIGIN (optional, comma separated)

const express = require('express');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));

const origins = (process.env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, methods: ['POST', 'GET', 'OPTIONS'] }));

const PROGRAM = 'WAPT Elite Training Program';
const AMOUNT = '₹4,999';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

const hits = new Map(); // 5 requests / 10 min / IP
setInterval(() => { const n = Date.now(); for (const [k, v] of hits) if (!v.some((t) => n - t < 600000)) hits.delete(k); }, 600000).unref();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 600000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

app.get('/', (req, res) => res.send('Cryptonic Area enroll API running'));
app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/enroll', async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) { console.error('Missing env: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID'); return res.status(500).json({ ok: false, error: 'Server not configured' }); }
  if (limited(req.ip)) return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });

  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot

  const name = clean(b.name, 80);
  const mobile = clean(b.mobile, 20);
  const email = clean(b.email, 100);
  const txn = clean(b.txnId, 40).replace(/[\s-]/g, '').toUpperCase();

  if (name.length < 2) return res.status(400).json({ ok: false, error: 'Enter a valid name' });
  if (!/^[0-9+ ]{8,15}$/.test(mobile)) return res.status(400).json({ ok: false, error: 'Enter a valid mobile number' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Enter a valid email' });
  const okTxn = /^\d{12}$/.test(txn) ? !/^(\d)\1{11}$/.test(txn) : (/^[A-Z0-9]{16,35}$/.test(txn) && !/^(.)\1+$/.test(txn));
  if (!okTxn) return res.status(400).json({ ok: false, error: 'Enter a valid 12-digit UPI transaction ID' });

  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const digits = mobile.replace(/\D/g, '');
  const wa = digits.length === 10 ? '91' + digits : digits;
  const ref = 'WAPT-' + Date.now().toString(36).toUpperCase();

  const text = [
    '🛡 <b>NEW WAPT ENROLLMENT</b>',
    '<i>Payment verification required</i>',
    '',
    '┌ 📚 <b>Program</b>', '└ ' + PROGRAM, '',
    '┌ 💰 <b>Amount</b>', '└ ' + AMOUNT, '',
    '┌ 👤 <b>Name</b>', '└ ' + esc(name), '',
    '┌ 📱 <b>Mobile</b>', '└ <code>' + esc(mobile) + '</code>', '',
    '┌ 📧 <b>Email</b>', '└ ' + esc(email), '',
    '┌ 🧾 <b>UTR / Transaction ID</b>', '└ <code>' + esc(txn) + '</code>', '',
    '🕒 ' + esc(time) + '  ·  🔖 <code>' + ref + '</code>',
    '⏳ <b>Status:</b> Awaiting verification',
  ].join('\n');

  try {
    const r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        disable_notification: false,
        reply_markup: { inline_keyboard: [[
          { text: '💬 WhatsApp', url: 'https://wa.me/' + wa + '?text=' + encodeURIComponent('Hi ' + name + ', your WAPT enrollment payment is verified. Welcome to Cryptonic Area!') },
        ]] },
      }),
    });
    const d = await r.json();
    if (!d.ok) { console.error('Telegram error:', d.description); return res.status(502).json({ ok: false, error: 'Could not notify team', detail: process.env.DEBUG === '1' ? d.description : undefined }); }
    res.json({ ok: true, ref });
  } catch (e) {
    console.error('Send failed:', e.message);
    res.status(502).json({ ok: false, error: 'Could not notify team', detail: process.env.DEBUG === '1' ? e.message : undefined });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Enroll API listening on ' + PORT));
