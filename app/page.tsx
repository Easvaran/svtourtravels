"use client";

import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import PopularDestinations from "@/components/PopularDestinations";
import TravelPackages from "@/components/TravelPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ChevronRight, Search, MapPin, IndianRupee, Clock, ChevronDown, Filter } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

export default function Home() {
  const { settings } = useSettings();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  useEffect(() => {
    fetch("/api/tours")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTours(data);
          setFilteredTours(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = tours;
    if (selectedLocation !== "All") {
      result = result.filter((t: any) => t.location === selectedLocation || t.title?.toLowerCase().includes(selectedLocation.toLowerCase()));
    }
    if (searchTerm) {
      result = result.filter((t: any) => t.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedPrice !== "All") {
      const priceNum = (p: any) => parseInt(p?.toString().replace(/,/g, "") || "0");
      result = result.filter((t: any) => {
        const p = priceNum(t.price);
        if (selectedPrice === "Under 10k") return p < 10000;
        if (selectedPrice === "10k - 20k") return p >= 10000 && p <= 20000;
        if (selectedPrice === "20k - 30k") return p >= 20000 && p <= 30000;
        return p > 30000;
      });
    }
    if (selectedDuration !== "All") {
      const days = (d: any) => parseInt(d?.toString().split(" ")[0] || "0");
      result = result.filter((t: any) => {
        const d = days(t.duration);
        if (selectedDuration === "1-3 Days") return d >= 1 && d <= 3;
        if (selectedDuration === "4-6 Days") return d >= 4 && d <= 6;
        return d >= 7;
      });
    }
    setFilteredTours(result);
  }, [searchTerm, selectedLocation, selectedPrice, selectedDuration, tours]);

  const locations = ["All", "Ooty", "Kodaikanal", "Chennai", "Madurai", "Kerala", "Himachal", "Goa"];
  const priceRanges = ["All", "Under 10k", "10k - 20k", "20k - 30k", "Above 30k"];
  const durations = ["All", "1-3 Days", "4-6 Days", "7+ Days"];

  return (
    <div className="relative">
      <HeroSection />

      <Services />

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Search Tours</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={18} />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl pl-12 pr-4 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform z-10" size={18} />
                <select
                  className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl pl-12 pr-4 outline-none transition-all font-bold text-gray-900 appearance-none relative cursor-pointer"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Price Range</label>
              <div className="relative group">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform z-10" size={18} />
                <select
                  className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl pl-12 pr-4 outline-none transition-all font-bold text-gray-900 appearance-none relative cursor-pointer"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {priceRanges.map(price => <option key={price} value={price}>{price}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Duration</label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform z-10" size={18} />
                <select
                  className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-2xl pl-12 pr-4 outline-none transition-all font-bold text-gray-900 appearance-none relative cursor-pointer"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  {durations.map(dur => <option key={dur} value={dur}>{dur}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tours Grid Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-gray-900">
              {searchTerm || selectedLocation !== "All" ? `Search Results (${filteredTours.length})` : "All Tour Packages"}
            </h2>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
              <Filter size={16} />
              <span>{filteredTours.length} tours found</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-2">No tours found</h3>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("All");
                  setSelectedPrice("All");
                  setSelectedDuration("All");
                }}
                className="text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTours.map((tour: any) => (
                  <motion.div
                    key={tour._id || tour.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TourCard {...tour} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <HowItWorks />

      {/* Enquiry Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Get a Quote</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                Can't Find Your <br />
                <span className="text-primary underline decoration-secondary decoration-wavy underline-offset-8">Dream Destination?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 font-medium">
                Don't worry! Our travel experts can create a custom itinerary just for you. Tell us your preferences, budget, and travel dates, and we'll handle the rest.
              </p>
              
              <div className="space-y-8">
                {[
                  "Personalized Itineraries tailored to you",
                  "Expert Travel Advice from local guides",
                  "No Hidden Charges, total transparency"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-black text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <EnquiryForm />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <Testimonials />

      {/* Final Call to Action */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-[0_40px_100px_rgba(8,112,184,0.4)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <SafeImage
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-8 leading-tight"
              >
                Ready to Start Your <br /> Next Adventure?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium"
              >
                Join thousands of happy travelers who explored the world with {settings.websiteName}. Your dream vacation is just a click away.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-6"
              >
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto bg-secondary text-primary font-black px-12 py-6 rounded-2xl hover:bg-yellow-400 transition-all text-xl shadow-2xl hover:-translate-y-1 text-center"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
