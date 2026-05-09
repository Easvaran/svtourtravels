import mongoose, { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    seats: { type: Number, required: true },
    airConditioned: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    thumbnail: { type: String, required: true },
    gallery: [{ type: String }],
    frames360: [{ type: String }],
    status: { 
      type: String, 
      enum: ["active", "inactive", "deleted"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

const Vehicle = models.Vehicle || model("Vehicle", VehicleSchema);

export default Vehicle;
