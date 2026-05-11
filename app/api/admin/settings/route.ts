import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
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
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("GET Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log("Updating settings with data:", data);
    
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create(data);
    } else {
      // Use findByIdAndUpdate to ensure we get the fresh document back
      settings = await Settings.findByIdAndUpdate(
        settings._id, 
        { $set: data }, 
        { new: true, runValidators: true }
      );
    }
    
    console.log("Settings updated successfully. New Email:", settings.adminEmail);
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("PUT Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
