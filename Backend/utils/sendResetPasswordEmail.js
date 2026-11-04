const { sendEmail } = require("./sendEmail");

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

const sendResetPasswordEmail = async (user, resetLink) =>
  sendEmail({
    to: user.email,
    subject: "Reset your ExportYard password",
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:30px auto;background:#fff;padding:35px;border-radius:10px;">
          <h1 style="color:#15803d;text-align:center;">Reset your password</h1>
          <h2>Hello ${escapeHtml(user.name || "Customer")},</h2>
          <p>We received a request to reset your ExportYard password. Click the button below to choose a new one. This link expires in 15 minutes.</p>
          <div style="text-align:center;margin:30px 0;">
            <a href="${resetLink}"
              style="background:#15803d;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>Best Regards,<br/><strong>ExportYard Team</strong><br/>contact@exportyard.com</p>
          <hr/>
          <p style="text-align:center;color:#888;font-size:12px;">© ${new Date().getFullYear()} ExportYard. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  });

module.exports = sendResetPasswordEmail;