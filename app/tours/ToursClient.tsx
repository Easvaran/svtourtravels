"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Navigation2,
  ArrowRight,
  Info,
  ChevronRight,
  Star
} from "lucide-react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

const ToursClient = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        if (Array.isArray(data)) {
          setTours(data.filter((t: any) => t.status === "active"));
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-[#0870b8] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-black uppercase tracking-[0.2em] mb-6"
          >
            <Navigation size={16} />
            <span>Popular One-Way Routes</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Popular One-Way <span className="text-[#00bcd4]">Destinations</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg font-medium max-w-2xl mx-auto"
          >
            Fixed pricing with no hidden charges. Explore our most popular routes 
            across South India with professional drivers you can trust.
          </motion.p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] h-[400px] animate-pulse shadow-sm" />
              ))
            ) : tours.length > 0 ? (
              tours.map((tour, index) => (
                <motion.div
                  key={tour._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-[2.5rem] border ${tour.isPopular ? 'border-yellow-400 ring-4 ring-yellow-400/10 shadow-xl shadow-yellow-400/5' : 'border-gray-100 shadow-sm hover:shadow-xl'} transition-all duration-500 group overflow-hidden flex flex-col h-full`}
                >
                  {tour.image ? (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <SafeImage src={tour.image} alt={`${tour.from} to ${tour.to} taxi`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      {tour.isPopular && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-10">
                          <Star size={10} className="fill-current" />
                          Popular
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Navigation2 size={48} className="text-gray-200" />
                      {tour.isPopular && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-10">
                          <Star size={10} className="fill-current" />
                          Popular
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1 relative">
                    {/* Header: Locations */}
                    <div className="flex items-center gap-5 mb-8 relative">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full border-2 border-yellow-400 bg-white" />
                        <div className="w-px h-10 border-r-2 border-dashed border-gray-200" />
                        <Navigation2 size={16} className="text-[#10b981] rotate-180" />
                      </div>
                      <div className="flex flex-col gap-6">
                        <span className="text-xl font-black text-gray-900 group-hover:text-[#0870b8] transition-colors">{tour.from}</span>
                        <span className="text-xl font-black text-gray-900 group-hover:text-[#0870b8] transition-colors">{tour.to}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 rounded-2xl p-5 mb-8 border border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Distance</span>
                        <div className="flex items-center gap-2 text-[#10b981] font-black text-sm">
                          <Navigation size={14} className="rotate-45" />
                          {tour.distance}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Duration</span>
                        <div className="flex items-center gap-2 text-yellow-500 font-black text-sm">
                          <Clock size={14} />
                          {tour.duration}
                        </div>
                      </div>
                    </div>

                    {/* Footer: Price and Book */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mt-auto pt-6 border-t border-gray-100 gap-6">
                      <div className="flex flex-col items-center sm:items-start">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Starting from</span>
                        <span className="text-3xl font-black text-[#10b981]">₹{(tour.price || 0).toLocaleString()}</span>
                      </div>
                      
                      <Link 
                        href={`/?destination=Taxi from ${tour.from} to ${tour.to}#booking-form`}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 w-full sm:w-auto ${tour.isPopular ? 'bg-[#eab308] hover:bg-[#ca8a04] text-white shadow-yellow-400/20' : 'bg-[#10b981] hover:bg-[#059669] text-white shadow-emerald-400/20'}`}
                      >
                        <ArrowRight size={18} />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                <Info size={60} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black text-gray-900">No popular routes available right now.</h3>
                <p className="text-gray-500 font-medium mt-2">Check back soon for new destinations!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursClient;