import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tour = await Tour.findById(params.id);
    if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json(tour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    const tour = await Tour.findByIdAndUpdate(params.id, data, { new: true });
    if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json(tour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tour = await Tour.findByIdAndDelete(params.id);
    if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json({ message: "Tour deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
