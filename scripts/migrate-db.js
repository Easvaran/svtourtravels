const mongoose = require('mongoose');
const { tours: staticTours, travelPackages: staticPackages } = require('./lib/data');

const MONGODB_URI = "mongodb+srv://svtourtravels_db:svtourtravels123@svtourtravels.b7bunal.mongodb.net/?appName=svtourtravels";

const TourSchema = new mongoose.Schema({
  title: String,
  location: String,
  duration: String,
  price: String,
  rating: Number,
  image: String,
  images: [String],
  description: String,
  highlights: [String],
  itinerary: [{ day: Number, title: String, description: String }],
  includes: [String],
  excludes: [String],
  featured: { type: Boolean, default: false },
  slug: { type: String, unique: true }
}, { timestamps: true });

const PackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["Honeymoon", "Family", "Group", "Custom"]
  },
  includes: [{ type: String }],
  customEnabled: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  description: { type: String },
}, { timestamps: true });

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);
const Package = mongoose.models.Package || mongoose.model("Package", PackageSchema);

async function migrate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    console.log("Clearing existing data...");
    await Tour.deleteMany({});
    await Package.deleteMany({});
    console.log("Cleared.");

    console.log("Formatting tours...");
    const formattedTours = staticTours.map(tour => ({
      ...tour,
      featured: true, 
      rating: tour.rating || 5.0,
      slug: tour.slug || tour.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }));

    console.log("Inserting tours...");
    await Tour.insertMany(formattedTours);
    console.log(`Inserted ${formattedTours.length} tours.`);

    console.log("Formatting packages...");
    if (staticPackages && staticPackages.length > 0) {
      const formattedPackages = staticPackages.map((pkg) => ({
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
      console.log("Inserting packages...");
      await Package.insertMany(formattedPackages);
      console.log(`Inserted ${formattedPackages.length} packages.`);
    }

    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
