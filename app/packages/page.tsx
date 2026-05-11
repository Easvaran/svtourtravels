"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";
import { ChevronRight, Sparkles } from "lucide-react";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      });
  }, []);

  const categories = ["Honeymoon", "Family", "Group", "Custom"];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Packages"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-sm font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={16} />
            <span>Premium Travel Experiences</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter"
          >
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">Exclusive Packages</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From romantic honeymoons to adventurous group tours, we have the perfect curated experience for every traveler.
          </motion.p>
        </div>
      </section>

      {/* Categorized Packages */}
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        {categories.map((category, catIdx) => {
          const catPackages = packages.filter((pkg: any) => pkg.category === category);
          if (!loading && catPackages.length === 0) return null;

          return (
            <section key={category} className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="max-w-2xl">
                  <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">
                    Luxury Stays
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-none tracking-tight">
                    {category} Packages
                  </h2>
                </div>
                <div className="h-[2px] flex-1 bg-gray-200 mb-4 hidden md:block mx-12" />
                <button className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                  <span>View All</span>
                  <ChevronRight size={20} />
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100 shadow-sm" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catPackages.map((pkg: any) => (
                    <PackageCard key={pkg._id} {...pkg} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
