// Cryptonic Area - backend for the "Talk to responders" form.
// Receives the request from the website and sends it to a Telegram chat.
//
// Render environment variables (Dashboard > Environment):
//   TELEGRAM_BOT_TOKEN  = token from @BotFather
//   TELEGRAM_CHAT_ID    = your chat / group / channel id
//   ALLOWED_ORIGIN      = your website, e.g. https://cryptonicarea.site  (comma separated for many; omit to allow all)
const express = require('express');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const origins = (process.env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: origins.length ? origins : true,
  methods: ['POST', 'GET', 'OPTIONS']
}));

// tiny in-memory rate limit: max 5 requests / 10 min per IP
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < win);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}
setInterval(() => hits.clear(), 60 * 60 * 1000).unref();

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

app.get('/', (_req, res) => res.send('Cryptonic Area backend is running'));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/responder', async (req, res) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return res.status(500).json({ ok: false, error: 'Server not configured' });
    }
    if (limited(req.ip)) {
      return res.status(429).json({ ok: false, error: 'Too many requests' });
    }

    const b = req.body || {};
    const d = {
      name: clean(b.name, 100),
      organization: clean(b.organization, 120),
      designation: clean(b.designation, 100),
      phone: (clean(b.countryCode, 8) + ' ' + clean(b.phone, 20)).trim(),
      email: clean(b.email, 120),
      message: clean(b.message, 1000),
      page: clean(b.page, 200)
    };

    if (!d.name || !d.organization || !d.designation || !clean(b.phone, 20) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
      return res.status(400).json({ ok: false, error: 'Invalid or missing fields' });
    }

    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
    const text =
      '🚨 <b>New Responder Request</b>\n' +
      '━━━━━━━━━━━━━━━\n' +
      '👤 <b>Name:</b> ' + esc(d.name) + '\n' +
      '🏢 <b>Organization:</b> ' + esc(d.organization) + '\n' +
      '💼 <b>Designation:</b> ' + esc(d.designation) + '\n' +
      '📞 <b>Mobile:</b> ' + esc(d.phone) + '\n' +
      '✉️ <b>Email:</b> ' + esc(d.email) + '\n' +
      '📝 <b>Message:</b> ' + (d.message ? esc(d.message) : '—') + '\n' +
      '━━━━━━━━━━━━━━━\n' +
      '🕒 ' + esc(time) + ' IST' + (d.page ? '\n🔗 ' + esc(d.page) : '');

    const tg = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const out = await tg.json().catch(() => ({}));
    if (!tg.ok || !out.ok) {
      console.error('Telegram error:', out);
      return res.status(502).json({ ok: false, error: 'Could not deliver request' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Backend listening on ' + PORT));
