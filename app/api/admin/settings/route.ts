import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== GET /api/admin/settings ==========");
  
  try {
    console.log("Step 1: Connecting to database...");
    await connectDB();
    console.log("Step 1: Database connected!");

    console.log("Step 2: Finding settings...");
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

    console.log("Step 4: Returning success response!");
    return NextResponse.json(
      {
        success: true,
        message: "Settings fetched successfully",
        data: settings
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );

  } catch (error: any) {
    console.error("========== GET SETTINGS ERROR ==========");
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error"
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }
}

export async function PUT(request: Request) {
  console.log("========== PUT /api/admin/settings ==========");
  
  try {
    console.log("Step 1: Connecting to database...");
    await connectDB();
    console.log("Step 1: Database connected!");

    console.log("Step 2: Reading request body...");
    const text = await request.text();
    console.log("Step 2: Request body received! Length:", text.length);

    let data;
    try {
      data = JSON.parse(text);
      console.log("Step 3: JSON parsed successfully!");
    } catch (parseError) {
      console.error("Step 3: Invalid JSON!");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON in request body"
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        }
      );
    }

    console.log("Step 4: Updating settings...");
    console.log("Incoming settings:", {
      ...data,
      logoUrl: data.logoUrl ? `[length: ${data.logoUrl.length}]` : "empty",
      faviconUrl: data.faviconUrl ? `[length: ${data.faviconUrl.length}]` : "empty"
    });

    const updated = await Settings.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    console.log("Step 5: Settings updated successfully!");
    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        data: updated
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );

  } catch (error: any) {
    console.error("========== PUT SETTINGS ERROR ==========");
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error"
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }
}
