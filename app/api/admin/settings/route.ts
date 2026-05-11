import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== GET /api/admin/settings ==========");
  
  try {
    await connectDB();
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }
    
    console.log("Settings fetched from database");
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
  console.log("========== PUT /api/admin/settings ==========");
  
  try {
    await connectDB();
    console.log("Request received");
    
    const body = await request.json();
    console.log("Request body:", body);
    
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );
    
    console.log("Settings updated in database");
    
    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        data: updatedSettings
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
