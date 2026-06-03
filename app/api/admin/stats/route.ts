import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Package from "@/models/Package";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    await connectDB();
    const tourCount = await Tour.countDocuments();
    const enquiryCount = await Enquiry.countDocuments();
    
    // Get recent enquiries that are not hidden
    const recentEnquiries = await Enquiry.find({ hiddenFromDashboard: { $ne: true } }).sort({ createdAt: -1 }).limit(5);
    
    // Get stats for last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentEnquiryCount = await Enquiry.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo },
      hiddenFromDashboard: { $ne: true }
    });

    return NextResponse.json({
      tourCount,
      enquiryCount,
      recentEnquiryCount,
      recentEnquiries
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
