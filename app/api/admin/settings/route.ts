import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  try {
    console.log("=== GET /api/admin/settings called");
    await connectDB();
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create({
        websiteName: "SV Tour & Travels",
        contactEmail: "info@svtourtravels.com",
        contactPhone: "+91 8668076871",
        whatsappNumber: "+91 8668076871",
        address: "123 Travel Street, Destination City, Chennai, Tamil Nadu, India 600001",
        adminEmail: "admin@svtourtravels.com",
        adminUsername: "admin"
      });
      console.log("New settings document created");
    }
    
    console.log("Settings fetched from DB:", { adminEmail: settings.adminEmail });
    return NextResponse.json(settings, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (error: any) {
    console.error("=== GET Settings Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load settings" },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    console.log("=== PUT /api/admin/settings called");
    await connectDB();
    
    // Parse request body safely
    const text = await request.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse request JSON:", text);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    console.log("Updating settings with data:", data);
    
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create(data);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id, 
        { $set: data }, 
        { new: true, runValidators: true }
      );
    }
    
    console.log("Settings updated successfully. New Email:", settings.adminEmail);
    return NextResponse.json(settings, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (error: any) {
    console.error("=== PUT Settings Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update settings" },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}
