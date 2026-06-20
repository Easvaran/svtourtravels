import mongoose, { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    icon: { type: String, default: "Car" }, // Lucide icon name
    isPopular: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["active", "inactive", "deleted"], 
      default: "active" 
    },
    // SEO Fields
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    altText: { type: String, default: "" },
  },
  { timestamps: true }
);

// Force schema update in development
if (mongoose.models && mongoose.models.Service) {
  delete mongoose.models.Service;
}

const Service = model("Service", ServiceSchema);

export default Service;
