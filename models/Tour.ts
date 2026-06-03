import mongoose, { Schema, model, models } from "mongoose";

const TourSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    isPopular: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["active", "inactive", "deleted"], 
      default: "active" 
    },
    // Optional fields for backward compatibility if needed
    title: { type: String },
    description: { type: String },
    image: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

// Force schema update in development
if (mongoose.models && mongoose.models.Tour) {
  delete mongoose.models.Tour;
}

const Tour = model("Tour", TourSchema);

export default Tour;
