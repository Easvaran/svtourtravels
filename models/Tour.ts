import mongoose, { Schema, model, models } from "mongoose";

const TourSchema = new Schema(
  {
    from: { type: String },
    to: { type: String },
    distance: { type: String },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    isPopular: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["active", "inactive", "deleted"], 
      default: "active" 
    },
    // Optional fields for tour packages
    title: { type: String },
    description: { type: String },
    image: { type: String },
    images: [{ type: String }],
    slug: { type: String },
    location: { type: String },
    rating: { type: Number },
    highlights: [{ type: String }],
    itinerary: [{ type: Object }],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Force schema update in development
if (mongoose.models && mongoose.models.Tour) {
  delete mongoose.models.Tour;
}

const Tour = model("Tour", TourSchema);

export default Tour;
