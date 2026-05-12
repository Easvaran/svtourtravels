import mongoose, { Schema, model, models } from "mongoose";

const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ["Honeymoon", "Family", "Group", "Custom"]
    },
    includes: [{ type: String }], // e.g., ["Hotel", "Cab", "Food"]
    exclusions: [{ type: String }], // e.g., ["Flight", "Personal Expenses"]
    itinerary: [{
      day: { type: String },
      title: { type: String },
      description: { type: String }
    }],
    customEnabled: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

const Package = models.Package || model("Package", PackageSchema);

export default Package;
