"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import { Check, ArrowRight } from "lucide-react";
import { travelPackages } from "@/lib/data";

const TravelPackages = () => {
  return (
    <section id="packages" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Our Collections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Travel Categories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-medium"
          >
            We offer packages for every budget and style. Choose the one that suits you best.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col h-full border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <SafeImage
                  src={pkg.image}
                  alt={pkg.category}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-primary font-black px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg">
                    {pkg.category.split(' ')[0]}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-gray-900 mb-2">{pkg.category}</h3>
                <p className="text-primary font-black text-lg mb-6">{pkg.priceRange}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-500 font-medium text-sm">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-50 hover:bg-primary text-gray-900 hover:text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center space-x-2 group/btn">
                  <span>{pkg.cta}</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;
