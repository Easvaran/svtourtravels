import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    await connectDB();

    const settings = await Settings.findOne({});
    const isAllowedEmail = settings?.adminEmail === email || settings?.additionalEmails?.includes(email);
    
    if (!settings || !isAllowedEmail) {
      return NextResponse.json(
        { message: "Invalid request", success: false },
        { status: 400 }
      );
    }

    if (!settings.resetOtp || settings.resetOtp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP", success: false },
        { status: 400 }
      );
    }

    if (new Date() > new Date(settings.resetOtpExpires)) {
      return NextResponse.json(
        { message: "OTP has expired", success: false },
        { status: 400 }
      );
    }

    // Clear OTP after successful verification
    settings.resetOtp = null;
    settings.resetOtpExpires = null;
    await settings.save();

    return NextResponse.json({ 
      message: "OTP verified successfully", 
      success: true,
      // For this simplified flow, we return success and the frontend will redirect.
      // In a real app, you might return a one-time token.
    });
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "Verification failed", success: false, error: error.message },
      { status: 500 }
    );
  }
}
