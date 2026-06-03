import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

export async function GET() {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({ status: { $ne: "deleted" } }).sort({ createdAt: -1 });
    return NextResponse.json(vehicles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    // Basic validation
    if (!body.name) {
      return NextResponse.json({ error: "Vehicle name is required" }, { status: 400 });
    }

    // Ensure slug is unique if not provided
    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const vehicle = await Vehicle.create(body);
    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
