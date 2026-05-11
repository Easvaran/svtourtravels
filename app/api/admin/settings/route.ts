import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== GET /api/admin/settings ==========");

  try {
    console.log("Step 1: Connecting to database...");
    await connectDB();
    console.log("Step 1: Database connected successfully!");

    console.log("Step 2: Looking for settings...");
    let settings = await Settings.findOne({});
    console.log("Step 2: Settings found:", !!settings);

    if (!settings) {
      console.log("Step 3: Creating default settings...");
      settings = await Settings.create({
        websiteName: "SV Tour & Travels",
        contactEmail: "info@svtourtravels.com",
        contactPhone: "+91 8668076871",
        whatsappNumber: "+91 8668076871",
        address: "123 Travel Street, Destination City, Chennai, Tamil Nadu, India 600001",
        adminEmail: "admin@svtourtravels.com",
        adminUsername: "admin"
      });
      console.log("Step 3: Default settings created!");
    }

    console.log("Step 4: Returning settings...");
    const response = NextResponse.json(settings, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });

    console.log("========== GET /api/admin/settings SUCCESS ==========");
    return response;

  } catch (error: any) {
    console.error("========== GET /api/admin/settings ERROR ==========");
    console.error("Error type:", error?.constructor?.name || "Unknown");
    console.error("Error message:", error?.message || "No message");
    console.error("Error stack:", error?.stack || "No stack");

    const errorResponse = NextResponse.json(
      { error: error?.message || "Failed to load settings" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );

    console.log("Returning error response");
    return errorResponse;
  }
}

export async function PUT(request: Request) {
  console.log("========== PUT /api/admin/settings ==========");

  try {
    console.log("Step 1: Connecting to database...");
    await connectDB();
    console.log("Step 1: Database connected successfully!");

    console.log("Step 2: Reading request body...");
    const text = await request.text();
    console.log("Step 2: Request body received, length:", text.length);

    let data;
    try {
      data = JSON.parse(text);
      console.log("Step 3: JSON parsed successfully!");
    } catch (parseError) {
      console.error("Step 3: Failed to parse JSON!");
      console.error("Parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    console.log("Step 4: Looking for existing settings...");
    let settings = await Settings.findOne({});
    console.log("Step 4: Settings found:", !!settings);

    if (!settings) {
      console.log("Step 5: Creating new settings document...");
      settings = await Settings.create(data);
      console.log("Step 5: New settings created!");
    } else {
      console.log("Step 5: Updating existing settings...");
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { $set: data },
        { new: true, runValidators: true }
      );
      console.log("Step 5: Settings updated!");
    }

    console.log("Step 6: Returning updated settings...");
    const response = NextResponse.json(settings, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });

    console.log("========== PUT /api/admin/settings SUCCESS ==========");
    return response;

  } catch (error: any) {
    console.error("========== PUT /api/admin/settings ERROR ==========");
    console.error("Error type:", error?.constructor?.name || "Unknown");
    console.error("Error message:", error?.message || "No message");
    console.error("Error stack:", error?.stack || "No stack");

    const errorResponse = NextResponse.json(
      { error: error?.message || "Failed to update settings" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );

    console.log("Returning error response");
    return errorResponse;
  }
}
