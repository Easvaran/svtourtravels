"use client";

import { motion } from "framer-motion";
import { Users, Wind, IndianRupee, CheckCircle2, Star } from "lucide-react";
import { Vehicle } from "@/lib/vehicles";
import Vehicle360Viewer from "./Vehicle360Viewer";

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, isSelected, onSelect }: VehicleCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative group bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
        isSelected 
          ? "border-primary shadow-[0_20px_50px_rgba(8,112,184,0.15)] ring-4 ring-primary/5" 
          : "border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl"
      }`}
    >
      {/* Popular Badge */}
      {vehicle.popular && (
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg shadow-secondary/20">
            <Star size={12} className="fill-white" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Selected Indicator */}
      <div className={`absolute top-6 right-6 z-10 transition-all duration-500 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <div className="bg-primary text-white p-2 rounded-2xl shadow-lg shadow-primary/20">
          <CheckCircle2 size={24} />
        </div>
      </div>

      {/* 360 Viewer Section */}
      <div className="p-2">
        <Vehicle360Viewer 
          framesPath={vehicle.framesPath} 
          frameCount={vehicle.frameCount} 
          imageAlt={vehicle.name}
          fallbackImage={vehicle.image}
          frames360={(vehicle as any).frames360}
        />
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{vehicle.type}</p>
            <h3 className="text-2xl font-black text-gray-900 leading-tight">{vehicle.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Per Day</p>
            <p className="text-xl font-black text-gray-900">₹{vehicle.price.toLocaleString()}</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
          {vehicle.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <Users size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Seats</p>
              <p className="text-sm font-black text-gray-900">{vehicle.seats} People</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <Wind size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Air Con</p>
              <p className="text-sm font-black text-gray-900">{vehicle.ac ? "AC" : "Non-AC"}</p>
            </div>
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(vehicle)}
          className={`w-full py-5 rounded-2xl font-black transition-all active:scale-[0.98] ${
            isSelected
              ? "bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-100"
              : "bg-gray-900 text-white hover:bg-primary hover:shadow-[0_20px_40px_rgba(8,112,184,0.3)]"
          }`}
        >
          {isSelected ? "Remove Selection" : "Select Vehicle"}
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
