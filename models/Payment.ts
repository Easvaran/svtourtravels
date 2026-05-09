import mongoose, { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    tourName: { type: String, required: true },
    vehicleName: { type: String },
    travelDate: { type: String, required: true },
    paymentType: { 
      type: String, 
      enum: ["enquiry", "advance", "full"],
      required: true
    },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    paymentStatus: { 
      type: String, 
      enum: ["success", "failed", "pending"],
      default: "pending"
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
