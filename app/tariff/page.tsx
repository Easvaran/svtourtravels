"use client";

import TariffSection from "@/components/TariffSection";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TariffPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <Sparkles size={16} />
            <span>Best Rates Guaranteed</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Our Transparent <span className="text-[#00bcd4]">Tariff</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg font-medium max-w-2xl mx-auto"
          >
            Explore our wide range of vehicles with simple and honest pricing. 
            No hidden charges, just great service.
          </motion.p>
        </div>
      </section>

      <TariffSection />
    </div>
  );
}
