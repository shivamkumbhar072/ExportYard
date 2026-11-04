const { sendEmail } = require("./sendEmail");

const sendOtpEmail = async (email, otp) =>
  sendEmail({
    to: email,
    subject: "Your ExportYard verification code",
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:30px auto;background:#fff;padding:35px;border-radius:10px;">
          <h1 style="color:#15803d;text-align:center;">Verify your email</h1>
          <p>Use the code below to finish creating your ExportYard account.</p>
          <div style="text-align:center;margin:30px 0;">
            <span style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#15803d;">${otp}</span>
          </div>
          <p>This code expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
          <p>Best Regards,<br/><strong>ExportYard Team</strong><br/>contact@exportyard.com</p>
          <hr/>
          <p style="text-align:center;color:#888;font-size:12px;">© ${new Date().getFullYear()} ExportYard. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  });

module.exports = sendOtpEmail;