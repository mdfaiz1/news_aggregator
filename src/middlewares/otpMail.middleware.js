export const generateOtpMail = (
  otp,
  toEmail,
  fromEmail = process.env.SMTP_SEND_MAIL
) => ({
  from: `"News Aggregator Team" <${fromEmail}>`,
  to: toEmail, // receiver email
  subject: "Your One-Time Password (OTP) for Verification 🔐",
  text: `Your OTP for verification is ${otp}. It will expire in 5 minutes.`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
      <h2 style="color: #4CAF50; text-align: center;">🔐 Email Verification</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">
        Thank you for signing up for <b>News Aggregator</b>! Use the following One-Time Password (OTP) to verify your email:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #000; background: #f3f3f3; padding: 10px 20px; border-radius: 8px;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 14px; color: #555;">
        ⚠️ This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone for security reasons.
      </p>
      <p style="font-size: 16px; color: #333;">
        Best regards,<br>
        <b>News Aggregator Team</b>
      </p>
    </div>
  `,
});
