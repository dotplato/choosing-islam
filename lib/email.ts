import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Do not fail on invalid certificates if explicitly requested
      rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED !== "false",
    },
  });
};

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = createTransporter();

  // Verify connection configuration
  try {
    await transporter.verify();
  } catch (err: any) {
    console.error("SMTP connection error:", err);
    throw new Error(`Email configuration error: ${err.message}`);
  }

  const fromName = process.env.EMAIL_FROM_NAME || "Islamic Dawah Center";
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;

  if (!fromAddress) {
    throw new Error(
      "EMAIL_FROM_ADDRESS is not defined in environment variables",
    );
  }

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    html,
  });

  return info;
}

