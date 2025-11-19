const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-revision", async (req, res) => {
  const { quoteId, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Terracotta Portal" <${process.env.EMAIL_USER}>`,
      to: "admin@terracottaconstruction.com",
      subject: `Revision Request for Quote #${quoteId}`,
      html: `
        <h2>Quote Revision Requested</h2>
        <p><strong>Customer Email:</strong> ${email}</p>
        <p><strong>Quote ID:</strong> ${quoteId}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
