import mongoose, { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    destination: { type: String, required: true },
    travelDate: { type: String, required: true },
    time: { type: String },
    tripType: { type: String },
    returnDate: { type: String },
    days: { type: Number, default: 1 },
    people: { type: Number, default: 1 },
    packageType: { type: String, default: "taxi" },
    message: { type: String },
    vehicleName: { type: String },
    vehicleType: { type: String },
    vehiclePrice: { type: Number },
    vehicleSeats: { type: Number },
    paymentType: { type: String, enum: ["enquiry", "advance", "full"], default: "enquiry" },
    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ["pending", "partially_paid", "fully_paid"], default: "pending" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    hiddenFromDashboard: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Delete the model if it exists to force a schema update in development
if (mongoose.models && mongoose.models.Enquiry) {
  delete mongoose.models.Enquiry;
}

const Enquiry = model("Enquiry", EnquirySchema);

export default Enquiry;
