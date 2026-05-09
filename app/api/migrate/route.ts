import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Package from "@/models/Package";
import { tours as staticTours, travelPackages as staticPackages } from "@/lib/data";
import mongoose from "mongoose";

// Using a separate connection helper to ensure we don't have issues
const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing data to ensure a fresh sync as requested by user
    await Tour.deleteMany({});
    await Package.deleteMany({});

    const formattedTours = staticTours.map(tour => ({
      ...tour,
      featured: true, 
      rating: tour.rating || 5.0,
      slug: tour.slug || tour.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }));

    await Tour.insertMany(formattedTours);

    // Also migrate packages if they exist in static data
    if (staticPackages && staticPackages.length > 0) {
      const formattedPackages = staticPackages.map((pkg: any) => ({
        name: pkg.category,
        price: pkg.priceRange.split("-")[0].trim().replace("₹", ""),
        duration: "Flexible",
        image: pkg.image,
        category: pkg.category.includes("Honeymoon") ? "Honeymoon" : 
                  pkg.category.includes("Family") ? "Family" : 
                  pkg.category.includes("Group") ? "Group" : "Custom",
        includes: pkg.features || ["Hotel", "Cab", "Food"],
        customEnabled: true,
        featured: true
      }));
      await Package.insertMany(formattedPackages);
    }
    
    return NextResponse.json({ message: "All tours and packages details saved to MongoDB successfully" });
  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
