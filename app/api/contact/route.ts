import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Check if required env vars are present
    const requiredEnvVars = [
      "EMAIL_HOST",
      "EMAIL_USER",
      "EMAIL_PASS",
      "EMAIL_FROM_ADDRESS",
    ];
    const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
    if (missingVars.length > 0) {
      console.error("Missing environment variables:", missingVars);
      return NextResponse.json(
        {
          error: `Server configuration error: Missing ${missingVars.join(", ")}`,
        },
        { status: 500 }
      );
    }

    const htmlContentAdmin = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0d9488;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    const htmlContentUser = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0d9488;">Thank you for reaching out!</h2>
        <p>Hello ${name},</p>
        <p>We have received your message regarding "<strong>${subject}</strong>". Our team will review your inquiry and get back to you as soon as possible.</p>
        <p>Best regards,<br><strong>Islamic Dawah Center</strong></p>
      </div>
    `;

    // 1. Send email to Admin
    await sendEmail({
      to: process.env.EMAIL_TO_ADDRESS || "admin@example.com",
      subject: `Contact Form: ${subject}`,
      html: htmlContentAdmin,
    });

    // 2. Send confirmation to User (Auto-responder)
    await sendEmail({
      to: email,
      subject: "Thank you for contacting us",
      html: htmlContentUser,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
