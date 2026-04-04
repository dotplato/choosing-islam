import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      bankName,
      accountNumber,
      amount,
      frequency,
    } = body;

    // Log the request body for debugging
    console.log("Donation request received:", body);

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
        { error: `Server configuration error: Missing ${missingVars.join(", ")}` },
        { status: 500 }
      );
    }

    const htmlContentAdmin = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0d9488;">New Donation Request</h2>
        <p><strong>Donor:</strong> ${firstName || "Anonymous"} ${lastName || ""}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Frequency:</strong> ${frequency}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <h3 style="color: #0d9488;">Bank Transfer Details</h3>
        <p><strong>Bank Name:</strong> ${bankName}</p>
        <p><strong>Account Number:</strong> ${accountNumber}</p>
      </div>
    `;

    const htmlContentUser = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0d9488;">Thank you for your support!</h2>
        <p>Hello ${firstName || "there"},</p>
        <p>We have received your donation request for <strong>$${amount}</strong> (${frequency}).</p>
        <p>This is a confirmation that your request has been logged. Our team will review the details and reach out if any further information is needed.</p>
        <p>Your support helps us continue our mission in Belize.</p>
        <p>Best regards,<br><strong>Islamic Dawah Center</strong></p>
      </div>
    `;

    // 1. Send email to Admin
    await sendEmail({
      to: process.env.EMAIL_TO_ADDRESS || "admin@example.com",
      subject: `Donation Request: $${amount} from ${firstName || "Anonymous"}`,
      html: htmlContentAdmin,
    });

    // 2. Send confirmation to Donor (Auto-responder)
    if (email) {
      await sendEmail({
        to: email,
        subject: "Confirmation of your donation request",
        html: htmlContentUser,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending donation email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
