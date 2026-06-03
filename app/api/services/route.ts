import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ status: { $ne: "deleted" } }).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const service = await Service.create(body);
    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
