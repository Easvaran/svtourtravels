import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    
    if (!deletedEnquiry) {
      return NextResponse.json(
        { message: "Enquiry not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Enquiry deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete enquiry", success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
      return NextResponse.json(
        { message: "Enquiry not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(enquiry);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch enquiry", success: false, error: error.message },
      { status: 500 }
    );
  }
}
