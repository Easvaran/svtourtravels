"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import TourCard from "@/components/TourCard";
import { Search, MapPin, IndianRupee, Clock, ChevronDown, Filter, Sparkles, ChevronRight } from "lucide-react";
import { tours as staticTours } from "@/lib/data";

export default function ToursPage() {
  const [tours, setTours] = useState(staticTours);
  const [filteredTours, setFilteredTours] = useState(staticTours);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  useEffect(() => {
    console.log("Tours Data:", staticTours);
    fetch("/api/tours")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
          setFilteredTours(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedLocation, selectedPrice, selectedDuration, tours]);

  const applyFilters = () => {
    let result = tours;

    if (selectedLocation && selectedLocation !== "All") {
      result = result.filter(t => (t.location === selectedLocation) || (t.title?.toLowerCase().includes(selectedLocation.toLowerCase())));
    }

    if (searchTerm) {
      result = result.filter(t =>
        t.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Additional filters (Price, Duration) can be added here if needed, 
    // but following user's primary instructions for Location and Search first.
    
    if (selectedPrice !== "All") {
      const priceNum = (p: any) => parseInt(p?.toString().replace(/,/g, "") || "0");
      result = result.filter(t => {
        const p = priceNum(t.price);
        if (selectedPrice === "Under 10k") return p < 10000;
        if (selectedPrice === "10k - 20k") return p >= 10000 && p <= 20000;
        if (selectedPrice === "20k - 30k") return p >= 20000 && p <= 30000;
        return p > 30000;
      });
    }

    if (selectedDuration !== "All") {
      const days = (d: any) => parseInt(d?.toString().split(" ")[0] || "0");
      result = result.filter(t => {
        const d = days(t.duration);
        if (selectedDuration === "1-3 Days") return d >= 1 && d <= 3;
        if (selectedDuration === "4-6 Days") return d >= 4 && d <= 6;
        return d >= 7;
      });
    }

    setFilteredTours(result);
  };

  const locations = ["All", "Ooty", "Kodaikanal", "Chennai", "Madurai", "Kerala", "Himachal", "Goa"];
  const priceRanges = ["All", "Under 10k", "10k - 20k", "20k - 30k", "Above 30k"];
  const durations = ["All", "1-3 Days", "4-6 Days", "7+ Days"];

  const featuredTours = Array.isArray(tours) ? tours.filter((t: any) => t.featured).slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Explore Tours"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-sm font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={16} />
            <span>Discover Tamil Nadu</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter"
          >
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">Curated Tours</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Handpicked travel experiences designed to give you unforgettable memories.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        {/* Popular Section */}
        {featuredTours.length > 0 && !searchTerm && selectedLocation === "All" && (
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Most Loved</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-none tracking-tight">Popular Tours</h2>
              </div>
              <div className="h-[2px] flex-1 bg-gray-200 mb-4 hidden md:block mx-12" />
              <button className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                <span>See Why</span>
                <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featuredTours.map((tour: any) => (
                <div key={tour._id} className="lg:scale-105 first:lg:origin-left last:lg:origin-right">
                  <TourCard {...tour} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Tours Grid */}
        <section className="space-y-12">
          <div className="flex items-center justify-between">
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
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-500 font-medium italic mb-4">
                Showing popular tours instead
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("All");
                  setSelectedPrice("All");
                  setSelectedDuration("All");
                  setFilteredTours(tours);
                }}
                className="bg-primary text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
              >
                Show All Tours
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
        </section>
      </div>
    </div>
  );
}

