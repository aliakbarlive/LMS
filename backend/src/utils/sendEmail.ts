const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const {SMTP_HOST, SMTP_ADMIN_EMAIL,SMTP_PORT,SMTP_SERVICE, SMTP_MAIL, SMTP_PASSWORD} = process.env;


const sendEmail = async (options:any) => {
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

  const mailOptions = {
    from: SMTP_MAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.to}`);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export default sendEmail