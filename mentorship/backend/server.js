/**
 * Cryptonic Area — Mentorship Booking Backend
 * ---------------------------------------------------------------------------
 * Receives mentorship booking form submissions and securely forwards them to
 * your internal Telegram board. The Bot Token and Chat ID live only here, on
 * the server — never exposed in the browser/frontend source code.
 *
 * SETUP:
 *   1. npm install
 *   2. Create a ".env" file in this same folder with:
 *        TELEGRAM_BOT_TOKEN=your_bot_token_here
 *        TELEGRAM_CHAT_ID=your_chat_id_here
 *        PORT=3000
 *        ALLOWED_ORIGIN=https://cryptonicarea.site
 *   3. npm start
 *
 * The frontend (index.html) should POST to:  /api/mentorship-request
 * ---------------------------------------------------------------------------
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️  TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing from your .env file.');
    console.warn('    The server will run, but requests will fail until these are set.');
}

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

/* ---------------------------------------------------------------------- */
/* Simple in-memory rate limiter — max 5 requests per IP every 10 minutes */
/* ---------------------------------------------------------------------- */
const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
    const now = Date.now();
    const timestamps = (requestLog.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    timestamps.push(now);
    requestLog.set(ip, timestamps);
    return timestamps.length > RATE_LIMIT_MAX;
}

/* ---------------------------------------------------------------------- */
/* POST /api/mentorship-request                                          */
/* ---------------------------------------------------------------------- */
app.post('/api/mentorship-request', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        if (isRateLimited(ip)) {
            return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
        }

        const { name, email, phone, topic, duration, description } = req.body || {};

        // ---- Validation ----
        if (!name || !email || !phone || !topic || !duration || !description) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }
        if (name.length > 100 || phone.length > 20 || topic.length > 100 || duration.length > 30) {
            return res.status(400).json({ success: false, error: 'One or more fields exceed the allowed length.' });
        }
        if (description.length > 280) {
            return res.status(400).json({ success: false, error: 'Description must be 280 characters or fewer.' });
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
        }

        // ---- Escape basic Markdown special characters to keep Telegram formatting intact ----
        const esc = (str) => String(str).replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');

        const text =
`🎯 *New Mentorship Request*

👤 *Name:* ${esc(name)}
📧 *Email:* ${esc(email)}
📱 *Phone:* ${esc(phone)}
🏷️ *Topic:* ${esc(topic)}
⏱️ *Duration:* ${esc(duration)}
📝 *Description:*
${esc(description)}

🕒 *Submitted:* ${esc(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const tgResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
                parse_mode: 'MarkdownV2'
            })
        });

        const tgData = await tgResponse.json();

        if (!tgData.ok) {
            console.error('Telegram API error:', tgData);
            return res.status(502).json({ success: false, error: 'Could not deliver the request. Please try again shortly.' });
        }

        return res.status(200).json({ success: true, message: 'Mentorship request submitted successfully.' });

    } catch (err) {
        console.error('Mentorship request handler error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

/* ---------------------------------------------------------------------- */
/* Health check — useful for uptime monitoring / deployment platforms     */
/* ---------------------------------------------------------------------- */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'cryptonic-area-mentorship-backend' });
});

app.listen(PORT, () => {
    console.log(`✅ Cryptonic Area mentorship backend running on port ${PORT}`);
});
