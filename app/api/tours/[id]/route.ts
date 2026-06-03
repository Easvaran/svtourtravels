import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tour = await Tour.findById(params.id);
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json(tour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const tour = await Tour.findByIdAndUpdate(params.id, body, { new: true });
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tour = await Tour.findByIdAndUpdate(params.id, { status: "deleted" }, { new: true });
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Tour deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
