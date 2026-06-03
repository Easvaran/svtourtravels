import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Settings from "@/models/Settings";
import { sendEmail } from "@/lib/mail";

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Submitting enquiry to database:", body);
    
    await connectDB();
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'destination', 'travelDate'];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json(
          { message: `${field} is required`, success: false },
          { status: 400 }
        );
      }
    }

    const enquiry = await Enquiry.create({
      name: body.name,
      phone: body.phone,
      destination: body.destination,
      travelDate: body.travelDate,
      time: body.time || "",
      tripType: body.tripType || "one-way",
      returnDate: body.returnDate || "",
      days: Number(body.days) || 1,
      people: Number(body.people) || 1,
      packageType: body.packageType || "taxi",
      message: body.message || "",
      vehicleName: body.vehicleName || "",
      vehicleType: body.vehicleType || "",
      vehiclePrice: body.vehiclePrice ? Number(body.vehiclePrice) : 0,
      vehicleSeats: body.vehicleSeats ? Number(body.vehicleSeats) : 0,
      paymentType: body.paymentType || "enquiry",
      totalAmount: body.totalAmount || 0,
      paidAmount: body.paidAmount || 0,
      remainingAmount: body.remainingAmount || 0,
      paymentStatus: body.paymentStatus || "pending",
      razorpayOrderId: body.razorpayOrderId || "",
      razorpayPaymentId: body.razorpayPaymentId || "",
    });

    console.log("Enquiry saved successfully:", enquiry._id);

    // Send Email notification - Only send limited details as requested
    try {
      const settings = await Settings.findOne({});
      const recipientEmail = settings?.adminEmail || process.env.EMAIL_TO || "";

      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1e40af; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Trip Enquiry</h1>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <p style="font-size: 16px; margin-bottom: 24px;">You have received a new enquiry from <strong>${body.name}</strong>.</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 140px;">Customer Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${body.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Phone Number</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                  <a href="tel:${body.phone}" style="color: #1e40af; text-decoration: none; font-weight: bold;">${body.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Destination</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #1e40af;">${body.destination}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/enquiries" style="display: inline-block; background-color: #1e40af; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Full Details in Admin Panel</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">&copy; ${new Date().getFullYear()} SV Tour & Travels Admin System</p>
          </div>
        </div>
      `;

      if (recipientEmail) {
        await sendEmail({
          to: recipientEmail,
          subject: `New Enquiry for ${body.destination} - ${body.name}`,
          html: emailHtml,
        });
      }
    } catch (emailError) {
      console.error("Email notification failed to send:", emailError);
    }
    
    return NextResponse.json(
      { message: "Enquiry submitted successfully", success: true, data: enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to submit enquiry", success: false, error: error.message },
      { status: 500 }
    );
  }
}
