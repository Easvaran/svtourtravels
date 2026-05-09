"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { destinations } from "@/lib/data";

const PopularDestinations = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Explore Popular Destinatios
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Popular Tour Packages
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[900px]">
          {destinations.map((dest, index) => {
            // Asymmetrical grid layout:
            // Ooty: col-span-4, Thekkady: col-span-2
            // Kodaikanal: col-span-2, Munnar: col-span-2, Wayanad: col-span-2
            const spanClass = index === 0 ? "md:col-span-4 h-[350px] md:h-full" : 
                              index === 1 ? "md:col-span-2 h-[350px] md:h-full" : 
                              "md:col-span-2 h-[350px] md:h-full";
            
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${spanClass} relative group rounded-[2.5rem] overflow-hidden shadow-xl`}
              >
                <SafeImage
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                  <motion.h3 
                    className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-2xl"
                  >
                    {dest.name}
                  </motion.h3>
                  
                  <Link 
                    href={`/tours?location=${dest.name}`}
                    className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl active:scale-95 group/btn"
                  >
                    <span>Tour Packages</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform ml-1" />
                  </Link>
                </div>

                {/* Optional: Overlay effect on hover */}
                <div className="absolute inset-0 border-[10px] border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none rounded-[2.5rem]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
