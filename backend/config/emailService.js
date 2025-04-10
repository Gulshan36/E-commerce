// backend/config/emailService.js
import nodemailer from "nodemailer";

export const sendOrderEmail = async (toEmail, items, amount) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail
      pass: process.env.EMAIL_PASS,     // App Password from Gmail
    },
  });

  const itemList = items.map((item, i) => 
    `${i + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`
  ).join('\n');

  const mailOptions = {
    from: `"ShopNow" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🛒 Order Confirmation - Thank You for Shopping!",
    text: `Your order has been placed successfully.\n\nItems:\n${itemList}\n\nTotal Amount: ₹${amount}\n\nWe will deliver it soon. Thank you! 😊`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Order email sent to", toEmail);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
};
