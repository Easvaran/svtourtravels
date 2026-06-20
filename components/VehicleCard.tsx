"use client";

import { motion } from "framer-motion";
import { Users, IndianRupee, CheckCircle2 } from "lucide-react";
import { Vehicle } from "@/lib/vehicles";
import SafeImage from "./SafeImage";

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
      {/* Selected Indicator */}
      <div className={`absolute top-6 right-6 z-10 transition-all duration-500 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <div className="bg-primary text-white p-2 rounded-2xl shadow-lg shadow-primary/20">
          <CheckCircle2 size={24} />
        </div>
      </div>

      {/* Image Section */}
      <div className="p-2">
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gray-50">
          <SafeImage 
            src={vehicle.image} 
            alt={vehicle.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{vehicle.type}</p>
          <h3 className="text-2xl font-black text-gray-900 leading-tight mb-6">{vehicle.name}</h3>
          
          {/* Pricing Grid 2x2 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-sm">
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">One Way</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-gray-900">₹{vehicle.oneWayPrice || 0}</span>
                <span className="text-[10px] font-bold text-gray-600">/km</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 shadow-sm">
              <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Round Trip</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-gray-900">₹{vehicle.roundTripPrice || 0}</span>
                <span className="text-[10px] font-bold text-gray-600">/km</span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 shadow-sm">
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1">One Way Beta</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-black text-gray-900">₹{vehicle.oneWayBeta || 0}</span>
                <span className="text-[10px] font-bold text-gray-600">/day</span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 shadow-sm">
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1">Round Trip Beta</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-black text-gray-900">₹{vehicle.roundTripBeta || 0}</span>
                <span className="text-[10px] font-bold text-gray-600">/day</span>
              </div>
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
