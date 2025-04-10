// backend/config/invoiceGenerator.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = (user, order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `invoice_${order._id}.pdf`;
    const filePath = path.join('invoices', filename);

    if (!fs.existsSync('invoices')) fs.mkdirSync('invoices');

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(22).text('🧾 Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Customer: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`);
    doc.moveDown();

    // Table header
    doc.fontSize(16).text('Items:', { underline: true });
    doc.moveDown(0.5);

    order.items.forEach((item, i) => {
      doc.fontSize(12).text(`${i + 1}. ${item.name} — ₹${item.price} x ${item.quantity}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: ₹${order.amount}`, { bold: true });

    doc.end();

    stream.on('finish', () => {
      resolve(filePath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};
