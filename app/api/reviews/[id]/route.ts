import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const review = await Review.findByIdAndDelete(params.id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    const review = await Review.findByIdAndUpdate(params.id, data, { new: true });
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json(review);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
