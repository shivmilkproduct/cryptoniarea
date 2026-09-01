// Cryptonic Area Arena — Case Request Backend
// Receives case access requests from the-last-login.html and forwards them to Telegram.
//
// Required environment variables (set these in Render → your service → Environment):
//   TELEGRAM_BOT_TOKEN   → token from @BotFather
//   TELEGRAM_CHAT_ID     → the chat/channel/group ID your bot should send messages to
//   ALLOWED_ORIGIN        → (optional) your website origin, e.g. https://cryptonicarea.site
//                            defaults to "*" (any origin) if not set
//
// Deploy: push this /backend folder to its own repo (or subfolder), create a new
// Render Web Service pointing at it. Build command: npm install · Start command: npm start
//
// After deploying, copy the Render URL (e.g. https://your-service.onrender.com) and set
// BACKEND_ENDPOINT in the-last-login.html to: https://your-service.onrender.com/submit-case-request

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(express.json());

// ---- CORS (hand-rolled, no extra dependency needed) ----
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

// ---- Health check (Render pings this / you can visit it to confirm the service is live) ----
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", service: "cryptonic-area-arena-backend" });
});

// ---- Main endpoint used by the-last-login.html ----
app.post("/submit-case-request", async (req, res) => {
    try {
        const { case: caseId, name, email, mobile, submittedAt } = req.body || {};

        if (!name || !email || !mobile) {
            return res.status(400).json({ ok: false, error: "Missing required fields: name, email, mobile." });
        }

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment variables.");
            return res.status(500).json({ ok: false, error: "Server is not configured correctly." });
        }

        const safe = (v) => String(v).trim();
        const when = submittedAt ? new Date(submittedAt) : new Date();

        const message =
            `NEW CASE ACCESS REQUEST\n\n` +
            `Case: ${safe(caseId || "THE_LAST_LOGIN_CA-0001")}\n` +
            `Name: ${safe(name)}\n` +
            `Email: ${safe(email)}\n` +
            `Mobile: ${safe(mobile)}\n` +
            `Submitted: ${when.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;

        const tgResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message
            })
        });

        const tgResult = await tgResponse.json();

        if (!tgResult.ok) {
            console.error("Telegram API error:", tgResult);
            return res.status(502).json({ ok: false, error: "Failed to deliver request to Telegram." });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Unexpected error in /submit-case-request:", err);
        return res.status(500).json({ ok: false, error: "Unexpected server error." });
    }
});

app.listen(PORT, () => {
    console.log(`Cryptonic Area Arena backend running on port ${PORT}`);
});
