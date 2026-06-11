"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Navigation, 
  Clock, 
  Navigation2,
  ArrowRight,
  Star,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

const ToursSection = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Only show popular tours or first 3 tours on home page
          const activeTours = data.filter((t: any) => t.status === "active");
          setTours(activeTours.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (!loading && tours.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0870b8] text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
              <Navigation size={14} />
              <span>Popular Routes</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Most Popular <span className="text-[#0870b8]">One-Way</span> Destinations
            </h2>
            
            <p className="text-gray-500 text-lg font-medium">
              Fixed pricing with no hidden charges. Explore our most popular routes 
              across South India with professional drivers you can trust.
            </p>
          </div>

          <Link 
            href="/tours"
            className="group flex items-center gap-2 text-[#0870b8] font-black uppercase tracking-widest text-xs hover:text-[#065a94] transition-all"
          >
            View All Destinations
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] h-[400px] animate-pulse border border-gray-100 shadow-sm" />
            ))
          ) : (
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
                    <SafeImage src={tour.image} alt={`${tour.from} to ${tour.to}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
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
                      <span className="text-xl font-black text-gray-900 group-hover:text-[#0870b8] transition-colors line-clamp-1">{tour.from || ''}</span>
                      <span className="text-xl font-black text-gray-900 group-hover:text-[#0870b8] transition-colors line-clamp-1">{tour.to || ''}</span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50/50 rounded-2xl p-5 mb-8 border border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Distance</span>
                      <div className="flex items-center gap-2 text-[#10b981] font-black text-sm">
                        <Navigation size={14} className="rotate-45" />
                        {tour.distance || ''}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Duration</span>
                      <div className="flex items-center gap-2 text-yellow-500 font-black text-sm">
                        <Clock size={14} />
                        {tour.duration || ''}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
