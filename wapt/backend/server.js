// ============================================
// Cryptonic Area — Enrollment Backend
// Receives payment form data from website
// and forwards it to your Telegram chat.
// ============================================

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());              // allows your website to call this backend
app.use(express.json());      // reads JSON sent from the website form

// These come from Render's Environment Variables (set in Step 5 of the guide)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Health check — visiting the backend URL in a browser should show this
app.get("/", (req, res) => {
  res.send("Cryptonic Area enrollment backend is running.");
});

// Main endpoint — the website's payment popup sends data here
app.post("/api/enroll", async (req, res) => {
  try {
    const { program, price, name, mobile, email, transactionId, submittedAt } = req.body;

    const message =
      `🔔 *New Enrollment Request*\n\n` +
      `*Program:* ${program || "-"}\n` +
      `*Price:* ₹${price || "-"}\n\n` +
      `*Name:* ${name || "-"}\n` +
      `*Mobile:* ${mobile || "-"}\n` +
      `*Email:* ${email || "-"}\n` +
      `*Transaction ID:* ${transactionId || "-"}\n\n` +
      `*Submitted At:* ${submittedAt || new Date().toISOString()}`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(500).json({ success: false, error: data.description });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
