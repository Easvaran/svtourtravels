import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    await connectDB();

    const settings = await Settings.findOne({});
    if (!settings) {
      return NextResponse.json({ error: "System settings not found" }, { status: 500 });
    }

    // Check if input matches username, primary email, or any additional email
    const isUsernameMatch = settings.adminUsername === username;
    const isEmailMatch = settings.adminEmail === username || settings.additionalEmails?.includes(username);
    const isPasswordMatch = settings.adminPassword === password;

    if ((isUsernameMatch || isEmailMatch) && isPasswordMatch) {
      const cookieStore = cookies();
      cookieStore.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ message: "Login successful" });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
