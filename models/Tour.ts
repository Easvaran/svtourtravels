import mongoose, { Schema, model, models } from "mongoose";

const ItinerarySchema = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const TourSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    description: { type: String, required: true },
    itinerary: [ItinerarySchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tour = models.Tour || model("Tour", TourSchema);

export default Tour;
