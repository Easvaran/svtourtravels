import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function DELETE() {
  try {
    await connectDB();
    // Update enquiries to be hidden from dashboard instead of deleting them
    await Enquiry.updateMany({}, { hiddenFromDashboard: true });
    
    return NextResponse.json({ success: true, message: "Recent activity cleared from dashboard" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
