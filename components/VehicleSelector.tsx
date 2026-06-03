"use client";

import { motion } from "framer-motion";
import { Car, ChevronRight, Info, Loader2 } from "lucide-react";
import { Vehicle } from "@/lib/vehicles";
import VehicleCard from "./VehicleCard";
import { useState, useEffect } from "react";

interface VehicleSelectorProps {
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const VehicleSelector = ({ selectedVehicleId, onSelectVehicle }: VehicleSelectorProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => {
        // Map database fields to frontend vehicle interface
        const mappedVehicles = data
          .filter((v: any) => v.status === "active")
          .map((v: any) => ({
            id: v._id,
            name: v.name,
            type: v.type,
            seats: v.seats,
            ac: v.airConditioned,
            price: v.pricePerDay,
            image: v.thumbnail,
            framesPath: (v.frames360 && v.frames360.length > 0) 
              ? v.frames360[0].substring(0, v.frames360[0].lastIndexOf('/') + 1) 
              : "",
            frameCount: v.frames360?.length || 0,
            description: v.description,
            popular: v.isPopular,
            oneWayPrice: v.oneWayPrice,
            roundTripPrice: v.roundTripPrice,
            oneWayBeta: v.oneWayBeta,
            roundTripBeta: v.roundTripBeta,
            numBags: v.numBags,
            frames360: v.frames360 // Keep original frames array for better 360 viewer support
          }));
        setVehicles(mappedVehicles);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch vehicles:", err);
        setLoading(false);
      });
  }, []);
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-primary font-black tracking-[0.3em] uppercase text-xs mb-4">
            <Car size={16} />
            <span>Premium Fleet</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Choose Your <span className="text-primary">Vehicle</span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">Select your preferred travel vehicle for this trip</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl text-sm font-bold border border-blue-100">
          <Info size={18} />
          <span>All vehicles are GPS tracked & sanitized</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100" />
          ))
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <VehicleCard
                vehicle={vehicle}
                isSelected={selectedVehicleId === vehicle.id}
                onSelect={onSelectVehicle}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Car className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-bold">No vehicles available at the moment.</p>
          </div>
        )}
      </div>

      {/* Comparison Tip */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-12 bg-gray-50 border border-gray-100 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
            <Car size={32} />
          </div>
          <div>
            <h4 className="text-xl font-black text-gray-900">Need help choosing?</h4>
            <p className="text-gray-500 font-medium">Our travel experts can suggest the best vehicle for your group size.</p>
          </div>
        </div>
        <button className="group flex items-center space-x-3 bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all">
          <span>Compare Vehicles</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default VehicleSelector;
