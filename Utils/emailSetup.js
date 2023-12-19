import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config("./.env");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "healthheavenpw1@gmail.com",
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
});
export default transporter;
