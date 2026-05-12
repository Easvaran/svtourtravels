"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Hotel, 
  Car, 
  Utensils, 
  ChevronRight, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import SafeImage from "@/components/SafeImage";
import VehicleSelector from "@/components/VehicleSelector";

export default function PackageDetailsPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/packages/${id}`)
        .then(res => res.json())
        .then(data => {
          setPkg(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching package:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const scrollToFleet = () => {
    const fleetSection = document.getElementById("vehicle-selection");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("booking-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVehicleSelect = (vehicle: any) => {
    const vehicleId = vehicle._id || vehicle.id;
    const currentId = selectedVehicle?._id || selectedVehicle?.id;
    
    if (currentId === vehicleId) {
      setSelectedVehicle(null);
    } else {
      setSelectedVehicle(vehicle);
      // Scroll back to form after selection
      setTimeout(scrollToForm, 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#00bcd4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h1>
        <button onClick={() => window.history.back()} className="text-[#00bcd4] font-bold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const iconMap: { [key: string]: any } = {
    hotel: Hotel,
    cab: Car,
    food: Utensils,
    stay: Hotel,
    car: Car,
    meals: Utensils,
  };

  const whatsappMsg = `Hi, I am interested in the ${pkg.name} package (${pkg.category}).`;
  const whatsappLink = `https://wa.me/918668076871?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <SafeImage
          src={pkg.image}
          alt={pkg.name}
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f172a]" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00bcd4] text-sm font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={16} />
            <span>{pkg.category} Experience</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter"
          >
            {pkg.name}
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-6 text-white font-medium">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#00bcd4]" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#00bcd4]" />
              <span>Verified Destination</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Package Info */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <span className="text-[#00bcd4] font-bold tracking-[0.3em] uppercase text-sm block mb-4">About the Trip</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Package Details</h2>
                <div className="w-20 h-1.5 bg-[#00bcd4] rounded-full mb-8" />
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  {pkg.description || "Experience the perfect blend of luxury and adventure with our carefully curated package. Designed to give you the most authentic and memorable travel experience possible."}
                </p>
              </div>

              {/* Inclusions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {pkg.includes?.map((item: string, idx: number) => {
                  const Icon = iconMap[item.toLowerCase()] || CheckCircle2;
                  return (
                    <div key={idx} className="p-6 bg-gray-50 rounded-[2rem] text-center group hover:bg-[#00bcd4]/5 transition-all">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-[#00bcd4]">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item}</span>
                    </div>
                  );
                })}
              </div>

              {/* Itinerary Section */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-[#00bcd4] font-bold tracking-[0.3em] uppercase text-sm block mb-4">The Journey</span>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
                    <div className="w-20 h-1.5 bg-[#00bcd4] rounded-full" />
                  </div>
                  
                  <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
                    {pkg.itinerary.map((item: any, idx: number) => (
                      <div key={idx} className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-white border-4 border-[#00bcd4] rounded-full flex items-center justify-center z-10">
                          <span className="text-[10px] font-black text-gray-900">{idx + 1}</span>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-[#00bcd4]/20 transition-all">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <span className="text-[#00bcd4] font-black text-sm uppercase tracking-widest">{item.day}</span>
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50/50 p-8 rounded-[2.5rem] border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                      <CheckCircle2 size={18} />
                    </div>
                    <span>What's Included</span>
                  </h3>
                  <ul className="space-y-4">
                    {pkg.includes?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white">
                      <ShieldCheck size={18} />
                    </div>
                    <span>What's Excluded</span>
                  </h3>
                  <ul className="space-y-4">
                    {pkg.exclusions?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium opacity-70">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose This Package?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Hand-picked Premium Accommodations",
                    "Expert Local Drivers & Guides",
                    "Fully Customizable Itinerary",
                    "24/7 On-trip Support Guarantee"
                  ].map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-[#00bcd4]/10 rounded-full flex items-center justify-center text-[#00bcd4] shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety */}
              <div className="flex items-center gap-6 p-8 bg-[#0f172a] rounded-[2.5rem] text-white">
                <div className="w-16 h-16 bg-[#00bcd4] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#00bcd4]/20">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Safe Travel Certified</h4>
                  <p className="text-gray-400 text-sm font-medium">We prioritize your safety with verified transport and vetted partners.</p>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-5 relative" id="booking-form">
              <div className="sticky top-32">
                <EnquiryForm 
                  tourTitle={pkg.name} 
                  initialPrice={pkg.price}
                  selectedVehicle={selectedVehicle}
                  className="shadow-2xl border-0"
                />
                
                {/* Secondary Actions */}
                <div className="mt-8 flex flex-col gap-4">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-bold shadow-xl shadow-[#25D366]/20 hover:scale-[1.02] transition-all active:scale-95"
                  >
                    <MessageCircle size={24} fill="currentColor" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Selection Section */}
      <section className="py-24 bg-gray-50/50" id="vehicle-selection">
        <div className="max-w-7xl mx-auto px-4">
          <VehicleSelector 
            selectedVehicleId={selectedVehicle?._id || selectedVehicle?.id || null} 
            onSelectVehicle={handleVehicleSelect} 
          />
        </div>
      </section>
    </div>
  );
}
