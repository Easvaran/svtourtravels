import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Package from "@/models/Package";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    await connectDB();
    const tourCount = await Tour.countDocuments();
    const packageCount = await Package.countDocuments();
    const enquiryCount = await Enquiry.countDocuments();
    
    // Get recent enquiries
    const recentEnquiries = await Enquiry.find({}).sort({ createdAt: -1 }).limit(5);
    
    // Get stats for last 7 days (mocking some data if needed, but here just count)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentEnquiryCount = await Enquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    return NextResponse.json({
      tourCount,
      packageCount,
      enquiryCount,
      recentEnquiryCount,
      recentEnquiries
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
