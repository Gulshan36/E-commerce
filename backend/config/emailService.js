// backend/config/emailservice.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderEmail = async (to, items, amount) => {
  const itemList = items.map((i) => `${i.name} x${i.quantity}`).join("\n");
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Order Confirmation",
    text: `Thanks for your order!\n\nItems:\n${itemList}\nTotal: ₹${amount}`,
  });
};

export const sendInvoiceEmail = async (to, pdfBuffer) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Invoice",
    text: "Attached is your invoice PDF.",
    attachments: [{ filename: "invoice.pdf", content: pdfBuffer }],
  });
};
