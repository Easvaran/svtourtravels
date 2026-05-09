"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import { Hotel, Car, Utensils, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  name: string;
  price: string;
  duration: string;
  image: string;
  category: string;
  includes: string[];
  customEnabled?: boolean;
}

const PackageCard = ({
  name,
  price,
  duration,
  image,
  category,
  includes,
  customEnabled = true
}: PackageCardProps) => {
  const iconMap: { [key: string]: any } = {
    hotel: Hotel,
    cab: Car,
    food: Utensils,
    stay: Hotel,
    car: Car,
    meals: Utensils,
  };

  const whatsappMsg = `Hi, I am interested in the ${name} package (${category}).`;
  const whatsappLink = `https://wa.me/919025335720?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group flex flex-col h-full"
    >
      <div className="relative h-72 overflow-hidden">
        <SafeImage
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
            {category}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Starting from</p>
            <p className="text-3xl font-black text-white">₹{price}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full">
            <p className="text-white font-bold text-xs">{duration}</p>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-6 mb-8">
          {includes.map((item, idx) => {
            const Icon = iconMap[item.toLowerCase()] || Hotel;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex gap-3">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm group/wa"
          >
            <MessageCircle size={24} />
          </a>
          <button className="flex-1 bg-primary hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-[0_20px_50px_rgba(8,112,184,0.2)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.4)] flex items-center justify-center gap-3 group/btn">
            <span>{customEnabled ? "Custom Package" : "Book Now"}</span>
            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
