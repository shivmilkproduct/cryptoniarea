// Minimal backend for the "The Last Login" case-request form.
// Receives the form submission from the frontend and forwards it as a
// message to a Telegram chat using a Telegram Bot.
//
// Deploying on Render:
//   1. Create a bot with @BotFather on Telegram -> get a bot token.
//   2. Add that bot to the group/channel where you want requests to land,
//      or start a DM with it -> get the numeric chat_id
//      (easiest way: send it any message, then open
//      https://api.telegram.org/bot<TOKEN>/getUpdates in a browser and
//      read the "chat":{"id": ...} value).
//   3. In the Render dashboard, open this service -> Environment ->
//      add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID there directly.
//      No .env file is needed — Render injects them automatically.
//   4. Deploy. Take the deployed base URL and put
//      "<that-url>/submit-case-request" into BACKEND_ENDPOINT in
//      index-18-4.html.

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN || !CHAT_ID) {
    console.warn(
        "[WARN] TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID are not set. " +
        "Requests will be received but will fail to reach Telegram until " +
        "these are configured (see .env.example)."
    );
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

app.post("/submit-case-request", async (req, res) => {
    try {
        const { case: caseId, name, email, mobile, transactionId, submittedAt } = req.body || {};

        if (!name || !email || !mobile || !transactionId) {
            return res.status(400).json({ ok: false, error: "Missing required fields." });
        }

        const message =
            `🗂 <b>New Case Request</b>\n` +
            `Case: <b>${escapeHtml(caseId || "THE_LAST_LOGIN_CA-0001")}</b>\n\n` +
            `👤 Name: ${escapeHtml(name)}\n` +
            `📧 Email: ${escapeHtml(email)}\n` +
            `📱 Mobile: ${escapeHtml(mobile)}\n` +
            `💳 Transaction ID: ${escapeHtml(transactionId)}\n` +
            `🕒 Submitted: ${escapeHtml(submittedAt || new Date().toISOString())}`;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error("Telegram not configured — request received but not forwarded:", req.body);
            return res.status(500).json({ ok: false, error: "Telegram is not configured on the backend." });
        }

        const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML"
            })
        });

        const tgData = await tgRes.json();

        if (!tgRes.ok || !tgData.ok) {
            console.error("Telegram API rejected the message:", tgData);
            return res.status(502).json({ ok: false, error: "Telegram rejected the message.", details: tgData });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Unexpected error while handling case request:", err);
        return res.status(500).json({ ok: false, error: "Unexpected server error." });
    }
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Case-request backend listening on port ${PORT}`);
});
