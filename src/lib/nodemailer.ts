import nodemailer, { type SendMailOptions } from "nodemailer";
import { envs } from "../envs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: envs.GMAIL_APP_USER,
    pass: envs.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (config: SendMailOptions) =>
  await transporter.sendMail(config);
