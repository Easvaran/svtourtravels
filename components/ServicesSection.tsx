"use client";

import { motion } from "framer-motion";
import { 
  Car, 
  Plane, 
  Clock, 
  Repeat,
  Settings,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SafeImage from "./SafeImage";

const iconMap: { [key: string]: any } = {
  Car,
  Plane,
  Clock,
  Repeat,
  Settings,
};

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data.filter((s: any) => s.status === "active"));
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 px-4 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#eab308] text-[10px] font-black uppercase tracking-widest mb-4 border border-[#e2e8f0] shadow-sm"
          >
            <Sparkles size={14} className="fill-current" />
            <span>Our Services</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Choose our best <span className="text-[#0870b8]">Services</span>
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[450px] bg-white rounded-[2.5rem] animate-pulse shadow-sm border border-gray-100" />
            ))
          ) : services.length > 0 ? (
            services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Settings;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col h-full"
                >
                  {/* Service Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <SafeImage 
                      src={service.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-8 flex flex-col flex-1 relative">
                    {/* Background Pattern Shape like in image */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#eab308]/5 rounded-bl-[5rem] -z-0 pointer-events-none group-hover:bg-[#eab308]/10 transition-colors" />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="text-[#eab308] mb-4">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#0870b8] transition-colors">{service.title}</h3>
                      
                      <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                        {service.description}
                      </p>

                      <Link 
                        href="/contact"
                        className="inline-flex items-center gap-3 text-gray-900 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0870b8] group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={18} />
                        </div>
                        <span>Book Now</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold">
              No services found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
