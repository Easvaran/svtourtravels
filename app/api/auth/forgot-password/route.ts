import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectDB();

    const settings = await Settings.findOne({});
    const isAllowedEmail = settings?.adminEmail === email || settings?.additionalEmails?.includes(email);

    if (!settings || !isAllowedEmail) {
      return NextResponse.json(
        { message: "Email not found", success: false },
        { status: 404 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to settings
    settings.resetOtp = otp;
    settings.resetOtpExpires = expires;
    await settings.save();

    // Send email
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #1e40af; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Admin Password Reset</h1>
        </div>
        <div style="padding: 32px; color: #1e293b; text-align: center;">
          <p style="font-size: 16px; margin-bottom: 24px;">You requested a password reset for the SV Tour & Travels Admin Panel.</p>
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #1e40af;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #64748b;">This OTP will expire in 10 minutes.</p>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 32px;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Your SV Tour & Travels Admin OTP",
      html: emailHtml,
    });

    return NextResponse.json({ message: "OTP sent successfully", success: true });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Failed to send OTP", success: false, error: error.message },
      { status: 500 }
    );
  }
}
