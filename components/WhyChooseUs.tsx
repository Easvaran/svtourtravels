"use client";

import { motion } from "framer-motion";
import { stats, trustCards } from "@/lib/data";
import { ShieldCheck, Award, Lock, Zap, Heart, Headphones } from "lucide-react";

const iconMap: { [key: string]: any } = {
  "Best Price Guarantee": Award,
  "Trusted Guides": ShieldCheck,
  "Safe Travel": Lock,
  "Easy Booking": Zap,
  "Custom Packages": Heart,
  "Customer Support": Headphones,
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] p-12 md:p-16 shadow-[0_30px_60px_rgba(8,112,184,0.3)] grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white mb-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          {stats.map((stat, index) => (
            <div key={index} className="relative z-10">
              <p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Our Promise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-medium"
          >
            We are committed to providing you with the best travel experience possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustCards.map((card, index) => {
            const Icon = iconMap[card.title];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary group-hover:text-primary transition-all duration-500 text-primary">
                  <Icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
