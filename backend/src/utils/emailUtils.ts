import sendEmail from "./sendEmail";
const nodeMailer = require("nodemailer");

// Helper function to send a verification email
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const subject = "Email Verification";
  const body = `Click the following link to verify your email: http://localhost:5173/email-verify?token=${verificationToken}`;

  try {
    // Send the email
    const options = {
      to: email,
      subject,
      html: body,
    };
    await sendEmail(options);
    console.log("Verification email sent successfully");
  } catch (error: any) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Error sending verification email");
  }
}

// Helper function to send a reset password email

export async function sendResetPasswordEmail(
  email: string,
  resetPasswordToken: string
): Promise<void> {
  const subject = "Password Reset";
  const body = `Click the following link to reset your password: http://localhost:5173/password-email-verify?token=${resetPasswordToken}`;

  try {
    // Send the email
    const options = {
      to: email,
      subject,
      html: body,
    };
    await sendEmail(options);
    console.log("Reset password email sent successfully");
  } catch (error: any) {
    console.error("Error sending reset password email:", error.message);
    throw new Error("Error sending reset password email");
  }
}

const {SMTP_HOST, SMTP_ADMIN_EMAIL,SMTP_PORT,SMTP_SERVICE, SMTP_MAIL, SMTP_PASSWORD} = process.env;

export async function verifySmtpConnection(): Promise<void> {
  const transporter = nodeMailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP connection is ready to send emails");
  } catch (error) {
    console.error("Failed to verify SMTP connection:", error);
  }
}
