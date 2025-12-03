import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { quoteId, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
