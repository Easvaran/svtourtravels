import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  let responseBody: any = { error: "Failed to load settings" };
  let statusCode = 500;

  try {
    console.log("=== GET /api/admin/settings called ===");
    await connectDB();
    
    let settings = await Settings.findOne({});
    
    if (!settings) {
      console.log("No settings found - creating default");
      settings = await Settings.create({
        websiteName: "SV Tour & Travels",
        contactEmail: "info@svtourtravels.com",
        contactPhone: "+91 8668076871",
        whatsappNumber: "+91 8668076871",
        address: "123 Travel Street, Destination City, Chennai, Tamil Nadu, India 600001",
        adminEmail: "admin@svtourtravels.com",
        adminUsername: "admin"
      });
      console.log("New settings document created successfully");
    }
    
    console.log("Settings fetched from DB:", { 
      _id: settings._id,
      adminEmail: settings.adminEmail,
      hasLogo: !!settings.logoUrl,
      hasFavicon: !!settings.faviconUrl
    });
    
    responseBody = settings;
    statusCode = 200;
    return sendJsonResponse(responseBody, statusCode);
    
  } catch (error: any) {
    console.error("=== GET Settings ERROR ===");
    console.error("Error type:", error?.constructor?.name || "Unknown");
    console.error("Error message:", error?.message || "No message");
    console.error("Stack:", error?.stack || "No stack");
    
    responseBody = { error: error?.message || "Failed to load settings" };
    statusCode = 500;
    return sendJsonResponse(responseBody, statusCode);
  }
}

export async function PUT(request: Request) {
  let responseBody: any = { error: "Failed to update settings" };
  let statusCode = 500;

  try {
    console.log("=== PUT /api/admin/settings called ===");
    await connectDB();
    
    // Parse request body safely
    const text = await request.text();
    let data;
    
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse request JSON:", text.substring(0, 200));
      responseBody = { error: "Invalid JSON in request body" };
      statusCode = 400;
      return sendJsonResponse(responseBody, statusCode);
    }
    
    console.log("Updating settings with data:", {
      ...data,
      logoUrl: data.logoUrl ? `[Base64 string length: ${data.logoUrl?.length || 0}]` : "none",
      faviconUrl: data.faviconUrl ? `[Base64 string length: ${data.faviconUrl?.length || 0}]` : "none"
    });
    
    let settings = await Settings.findOne({});
    
    if (!settings) {
      console.log("No settings found - creating new document");
      settings = await Settings.create(data);
    } else {
      console.log("Updating existing settings document");
      settings = await Settings.findByIdAndUpdate(
        settings._id, 
        { $set: data }, 
        { new: true, runValidators: true }
      );
    }
    
    console.log("Settings updated successfully:", {
      _id: settings._id,
      adminEmail: settings.adminEmail,
      hasLogo: !!settings.logoUrl,
      hasFavicon: !!settings.faviconUrl
    });
    
    responseBody = settings;
    statusCode = 200;
    return sendJsonResponse(responseBody, statusCode);
    
  } catch (error: any) {
    console.error("=== PUT Settings ERROR ===");
    console.error("Error type:", error?.constructor?.name || "Unknown");
    console.error("Error message:", error?.message || "No message");
    console.error("Stack:", error?.stack || "No stack");
    
    responseBody = { error: error?.message || "Failed to update settings" };
    statusCode = 500;
    return sendJsonResponse(responseBody, statusCode);
  }
}

function sendJsonResponse(body: any, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
}
