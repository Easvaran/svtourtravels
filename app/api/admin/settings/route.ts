import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== GET /api/admin/settings ==========");

  try {
    await connectDB();
    console.log("Database connected");

    let settings = await Settings.findOne({});
    console.log("Settings found:", !!settings);

    if (!settings) {
      settings = await Settings.create({
        websiteName: "SV Tour & Travels",
        contactEmail: "info@svtourtravels.com",
        contactPhone: "+91 8668076871",
        whatsappNumber: "+91 8668076871",
        address: "123 Travel Street, Destination City, India 600001",
        adminEmail: "admin@svtourtravels.com",
        adminUsername: "admin"
      });
      console.log("Default settings created");
    }

    console.log("Returning success response");
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
    console.error("GET ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to load settings"
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
    await connectDB();
    console.log("Database connected");

    const text = await request.text();
    console.log("Request body length:", text.length);

    const body = JSON.parse(text);
    console.log("Parsed body keys:", Object.keys(body));

    const {
      websiteName,
      contactEmail,
      contactPhone,
      whatsappNumber,
      address,
      mapIframe,
      socialLinks,
      logoUrl,
      faviconUrl,
      adminUsername,
      adminEmail,
      adminPassword,
      additionalEmails
    } = body;

    let settings = await Settings.findOne({});

    if (!settings) {
      settings = new Settings();
    }

    if (websiteName !== undefined) settings.websiteName = websiteName;
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (contactPhone !== undefined) settings.contactPhone = contactPhone;
    if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;
    if (address !== undefined) settings.address = address;
    if (mapIframe !== undefined) settings.mapIframe = mapIframe;
    if (socialLinks !== undefined) settings.socialLinks = socialLinks;
    if (logoUrl !== undefined) settings.logoUrl = logoUrl;
    if (faviconUrl !== undefined) settings.faviconUrl = faviconUrl;
    if (adminUsername !== undefined) settings.adminUsername = adminUsername;
    if (adminEmail !== undefined) settings.adminEmail = adminEmail;
    if (adminPassword !== undefined && adminPassword) settings.adminPassword = adminPassword;
    if (additionalEmails !== undefined) settings.additionalEmails = additionalEmails;

    await settings.save();
    console.log("Settings saved successfully!");

    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        data: settings
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );

  } catch (error: any) {
    console.error("PUT ERROR:", error);
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
