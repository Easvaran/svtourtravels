import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== SIMPLE GET /api/admin/settings ==========");
  
  try {
    return NextResponse.json(
      {
        websiteName: "SV Tour & Travels",
        contactEmail: "info@svtourtravels.com",
        contactPhone: "+91 8668076871",
        whatsappNumber: "+91 8668076871",
        address: "123 Travel Street, Destination City, Chennai, Tamil Nadu, India 600001",
        adminEmail: "admin@svtourtravels.com",
        adminUsername: "admin",
        logoUrl: "",
        faviconUrl: "",
        socialLinks: {
          facebook: "",
          instagram: "",
          twitter: "",
          youtube: ""
        },
        additionalEmails: []
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "GET failed" },
      { status: 500, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}

export async function PUT(request: Request) {
  console.log("========== SIMPLE PUT /api/admin/settings ==========");
  
  try {
    const text = await request.text();
    console.log("Request body length:", text.length);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }
    
    console.log("Data received:", {
      ...data,
      logoUrl: data.logoUrl ? "[has value]" : "empty",
      faviconUrl: data.faviconUrl ? "[has value]" : "empty"
    });
    
    return NextResponse.json(
      {
        ...data,
        _id: "test-id-123"
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: "PUT failed" },
      { status: 500, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}
