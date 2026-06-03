"use client";

import { motion } from "framer-motion";
import { trustCards } from "@/lib/data";
import { ShieldCheck, Users, MapPin, Sparkles } from "lucide-react";

const iconMap: { [key: string]: any } = {
  "Transparent Pricing": ShieldCheck,
  "Professional Drivers": Users,
  "Wide Coverage": MapPin,
  "Clean Fleet": Sparkles,
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 px-6 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Column */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
              >
                Why Choose <span className="text-[#00bcd4]">Book Drop Taxi Online?</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl"
              >
                We're committed to making your travel experience seamless, affordable, and comfortable. 
                Join thousands of happy travelers across South India.
              </motion.p>
            </div>

            <div className="space-y-6">
              {trustCards.map((card, index) => {
                const Icon = iconMap[card.title] || ShieldCheck;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-6 group p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-[#00bcd4]/5 transition-all duration-500"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm text-[#00bcd4] group-hover:bg-[#00bcd4] group-hover:text-white transition-all duration-500">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-[#00bcd4] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Image/Visual Column (Optional, but makes it look professional) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 hidden lg:block relative"
          >
            <div className="absolute -inset-4 bg-[#00bcd4]/5 rounded-[3rem] blur-2xl" />
            <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                alt="SV Travels" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-3xl font-black leading-tight">
                  Your Trusted Partner <br /> for Every Journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
