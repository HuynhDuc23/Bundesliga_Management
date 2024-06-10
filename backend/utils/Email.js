import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendMail = async (option) => {
  // CREATE A TRANSPOTER
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  });
  // DEFAULT EMAIL OPTION
  const emailOptions = {
    from: "ductrantad23@gmail.com",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};
export default sendMail;
