import mongoose, { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, default: "Sedan" },
    description: { type: String, default: "Premium vehicle for your comfort" },
    pricePerDay: { type: Number, default: 0 },
    seats: { type: Number, default: 4 },
    airConditioned: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    oneWayPrice: { type: Number, default: 0 },
    roundTripPrice: { type: Number, default: 0 },
    oneWayBeta: { type: Number, default: 0 },
    roundTripBeta: { type: Number, default: 0 },
    numBags: { type: String, default: "2" },
    thumbnail: { type: String, default: "" },
    gallery: [{ type: String }],
    frames360: [{ type: String }],
    status: { 
      type: String, 
      enum: ["active", "inactive", "deleted"], 
      default: "active" 
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

// Force schema update in development
if (mongoose.models && mongoose.models.Vehicle) {
  delete mongoose.models.Vehicle;
}

const Vehicle = model("Vehicle", VehicleSchema);

export default Vehicle;
