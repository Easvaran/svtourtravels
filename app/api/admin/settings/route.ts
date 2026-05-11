import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_SETTINGS = {
  _id: "hardcoded-id-123",
  websiteName: "SV Tour & Travels",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "info@svtourtravels.com",
  contactPhone: "+91 8668076871",
  whatsappNumber: "+91 8668076871",
  address: "123 Travel Street, Destination City, India 600001",
  mapIframe: "",
  socialLinks: { facebook: "", instagram: "", twitter: "", youtube: "" },
  adminUsername: "admin",
  adminEmail: "admin@svtourtravels.com",
  additionalEmails: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

let savedSettings = { ...DEFAULT_SETTINGS };

export async function GET() {
  console.log("========== GET /api/admin/settings - NO DATABASE ==========");
  
  try {
    console.log("Returning hardcoded settings");
    return NextResponse.json(
      {
        success: true,
        message: "Settings fetched successfully",
        data: savedSettings
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load settings"
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }
}

export async function PUT(request: Request) {
  console.log("========== PUT /api/admin/settings - NO DATABASE ==========");
  
  try {
    console.log("Request received");
    
    const text = await request.text();
    console.log("Request body:", text);
    
    let body;
    try {
      body = JSON.parse(text);
      console.log("Parsed successfully");
    } catch (e) {
      console.error("Invalid JSON");
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request" },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }
    
    savedSettings = {
      ...savedSettings,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    console.log("Settings updated in memory");
    
    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        data: savedSettings
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings"
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }
}
