import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function GET() {
  try {
    await connectDB();
    const tours = await Tour.find({ status: { $ne: "deleted" } }).sort({ createdAt: -1 });
    return NextResponse.json(tours);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.from || !body.to || !body.price) {
      return NextResponse.json({ error: "From, To, and Price are required" }, { status: 400 });
    }

    // Generate slug from 'from' and 'to' if not provided
    if (!body.slug) {
      const baseSlug = `${body.from}-to-${body.to}`.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      const randomSuffix = Math.random().toString(36).substring(2, 7);
      body.slug = `${baseSlug}-${randomSuffix}`;
    }

    const tour = await Tour.create(body);
    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    console.error("Error creating tour:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "A tour with this route already exists or there is a slug conflict." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
