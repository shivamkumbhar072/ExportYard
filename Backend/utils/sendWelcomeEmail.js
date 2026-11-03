
const { sendEmail } = require("./sendEmail");

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));

const sendWelcomeEmail = async (user) => {
  const safeName = escapeHtml(user.name || "Customer");

  return sendEmail({
    to: user.email,
    subject: "Welcome to ExportYard!",
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:30px auto;background:#fff;padding:35px;border-radius:10px;">

          <h1 style="color:#15803d;text-align:center;">
            Welcome to ExportYard!
          </h1>

          <h2>Hello ${safeName},</h2>

          <p>
            Thank you for creating an account with ExportYard.
            We're delighted to have you onboard.
          </p>

          <p>
            Explore our products and connect with us for your
            import and export requirements.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="https://exportyard.com"
              style="background:#15803d;color:white;padding:14px 28px;
              text-decoration:none;border-radius:6px;">
              Visit ExportYard
            </a>
          </div>

          <p>We look forward to doing business with you.</p>

          <p>
            Best Regards,<br/>
            <strong>ExportYard Team</strong><br/>
            contact@exportyard.com
          </p>

          <hr/>

          <p style="text-align:center;color:#888;font-size:12px;">
            © ${new Date().getFullYear()} ExportYard. All rights reserved.
          </p>

        </div>
      </body>
      </html>
    `,
  });
};

module.exports = sendWelcomeEmail;
