import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"VeriCert" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    logger.info(`✅ Email sent to ${to}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`❌ Email failed: ${message}`);
  }
};
