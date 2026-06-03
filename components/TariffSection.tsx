"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Info } from "lucide-react";
import SafeImage from "./SafeImage";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/SettingsContext";

const TariffSection = () => {
  const { settings } = useSettings();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        if (Array.isArray(data)) {
          setVehicles(data.filter((v: any) => v.status === "active"));
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <section id="tariff" className="py-24 px-4 bg-[#f1f5f9] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#10b981] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#e2e8f0] shadow-sm">
            <Info size={14} />
            <span>Transparent Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Our Transparent <span className="text-[#10b981]">Tariff</span>
          </h2>
          
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Pay only for what you use. No hidden charges, no surprises. 
            Simple and honest pricing for your journey.
          </p>
        </div>

        {/* Tariff Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton loader
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] h-[500px] animate-pulse" />
            ))
          ) : vehicles.length > 0 ? (
            vehicles.map((item, index) => (
              <motion.div
                key={item._id || item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] border border-[#e2e8f0] p-6 shadow-sm flex flex-col"
              >
                {/* Vehicle Image */}
                <div className="relative h-48 mb-8 rounded-2xl overflow-hidden bg-[#f8fafc]">
                  <SafeImage
                    src={item.thumbnail || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 px-2">{item.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-[#ebfef5] rounded-xl p-3 border border-[#d1fae5] flex flex-col items-center">
                      <p className="text-[9px] font-black text-[#10b981] uppercase tracking-widest mb-1">One Way</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-black text-gray-900">₹{item.oneWayPrice || 0}</span>
                        <span className="text-[10px] font-bold text-gray-500">/km</span>
                      </div>
                    </div>
                    <div className="bg-[#f0f9ff] rounded-xl p-3 border border-[#e0f2fe] flex flex-col items-center">
                      <p className="text-[9px] font-black text-[#0ea5e9] uppercase tracking-widest mb-1">Round Trip</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-black text-gray-900">₹{item.roundTripPrice || 0}</span>
                        <span className="text-[10px] font-bold text-gray-500">/km</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#f8fafc] rounded-xl p-3 border border-[#f1f5f9] flex flex-col items-center">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">One Way Beta</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-black text-gray-900">₹{item.oneWayBeta || 0}</span>
                        <span className="text-[10px] font-bold text-gray-500">/day</span>
                      </div>
                    </div>
                    <div className="bg-[#f8fafc] rounded-xl p-3 border border-[#f1f5f9] flex flex-col items-center">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Round Trip Beta</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-black text-gray-900">₹{item.roundTripBeta || 0}</span>
                        <span className="text-[10px] font-bold text-gray-500">/day</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="space-y-3 mb-8 px-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users size={16} className="text-[#10b981]" />
                      <span className="text-xs font-bold text-gray-600">{item.seats || 4}+ Passengers</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Briefcase size={16} className="text-[#10b981]" />
                      <span className="text-xs font-bold text-gray-600">{item.numBags || "2"} Large Bags</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/?vehicleId=${item._id}#booking-form`}
                  className="w-full py-4 rounded-xl bg-[#10b981] text-white font-black text-sm transition-all hover:bg-[#059669] shadow-lg shadow-[#10b981]/20 active:scale-95 text-center"
                >
                  Book {item.name}
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 font-bold">
              No vehicles found in the fleet.
            </div>
          )}
        </div>

        {/* Note Section */}
        {!loading && settings?.tariffNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-6 md:p-8 bg-white/60 border-2 border-dashed border-gray-200 rounded-[2.5rem] max-w-4xl mx-auto shadow-sm"
          >
            <p className="text-gray-600 font-medium text-center text-sm md:text-base leading-relaxed">
              <span className="text-[#10b981] font-extrabold italic mr-1">Note:</span>{" "}
              <span className="italic">{settings.tariffNote.replace(/^Note:\s*/i, '')}</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TariffSection;
