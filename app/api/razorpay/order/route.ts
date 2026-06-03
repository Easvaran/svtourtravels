import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();
    const razorpay = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
