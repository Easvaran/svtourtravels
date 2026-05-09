"use client";

import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

interface PriceCardProps {
  amount: number;
  people: string | number;
}

export default function PriceCard({ amount, people }: PriceCardProps) {
  const peopleCount = parseInt(people.toString()) || 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary to-blue-700 rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-primary/30 relative overflow-hidden group"
    >
      {/* Decorative Background Icon */}
      <IndianRupee 
        size={120} 
        className="absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" 
      />
      
      <div className="relative z-10">
        <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-3">
          Total Estimated Amount
        </p>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl md:text-5xl font-black tracking-tight">
            ₹{amount.toLocaleString()}
          </span>
          <span className="text-xs md:text-sm font-bold text-white/70">
            Total
          </span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
              <IndianRupee size={16} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">
              Price Details
            </span>
          </div>
          <span className="text-sm font-bold bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            for {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
