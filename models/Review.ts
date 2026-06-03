import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, default: "" },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tour: { type: String, default: "" },
  },
  { timestamps: true }
);

// Force schema update in development
if (mongoose.models && mongoose.models.Review) {
  delete mongoose.models.Review;
}

const Review = model("Review", ReviewSchema);

export default Review;
