
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: {
      name: "ExportYard",
      address: process.env.SMTP_EMAIL,
    },
    to,
    subject,
    html,
  });

  return info;
};

module.exports = { sendEmail, transporter };
