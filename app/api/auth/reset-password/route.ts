import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const settings = await Settings.findOne({});
    const isAllowedEmail = settings?.adminEmail === email || settings?.additionalEmails?.includes(email);
    
    if (!settings || !isAllowedEmail) {
      return NextResponse.json(
        { message: "Invalid request", success: false },
        { status: 400 }
      );
    }

    // Update password
    settings.adminPassword = password;
    await settings.save();

    return NextResponse.json({ 
      message: "Password updated successfully", 
      success: true 
    });
  } catch (error: any) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { message: "Failed to update password", success: false, error: error.message },
      { status: 500 }
    );
  }
}
