"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";
import { ChevronRight, ChevronLeft, X, Globe, MapPin, Users } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    title: "Discover the World's",
    subtitle: "Hidden Gems",
    description: "Experience breathtaking landscapes and vibrant cultures with our exclusive tour packages."
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    title: "Relax on Pristine",
    subtitle: "Tropical Beaches",
    description: "Escape to paradise with our curated beach holiday destinations across the globe."
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    title: "Adventure Awaits in",
    subtitle: "The Majestic Peaks",
    description: "Embark on an unforgettable journey through the world's most stunning mountain ranges."
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 lg:py-0 bg-[#0f172a]">
      {/* Decorative elements - Lowered opacity to prevent "beams" */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <SafeImage
            src={slides[currentSlide].image}
            alt="Travel Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center pt-24 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center w-full pb-10 lg:pb-0">
          {/* Left Content */}
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "lg:col-span-7 text-left transition-all duration-500",
              showForm ? "hidden lg:block opacity-0 lg:opacity-100" : "block opacity-100"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3 mb-4 lg:mb-6"
            >
              <div className="flex -space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 lg:border-3 border-white/20 flex items-center justify-center">
                  <Users size={14} className="text-white lg:hidden" />
                  <Users size={18} className="text-white hidden lg:block" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-primary-600 border-2 lg:border-3 border-white/20 flex items-center justify-center">
                  <Globe size={14} className="text-white lg:hidden" />
                  <Globe size={18} className="text-white hidden lg:block" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-amber-400 to-accent-600 border-2 lg:border-3 border-white/20 flex items-center justify-center">
                  <MapPin size={14} className="text-white lg:hidden" />
                  <MapPin size={18} className="text-white hidden lg:block" />
                </div>
              </div>
              <span className="text-white font-semibold text-xs lg:text-sm">5000+ Happy Travelers</span>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-block px-4 py-1.5 lg:px-5 lg:py-2 mb-4 lg:mb-6 text-[10px] lg:text-xs font-black tracking-[0.2em] lg:tracking-[0.35em] text-white uppercase bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
            >
              Explore • Discover • Travel
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#ffffff] mb-4 lg:mb-7 leading-[1.1] tracking-tight drop-shadow-lg"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {slides[currentSlide].title} <br />
              <span className="gradient-text">
                {slides[currentSlide].subtitle}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-sm md:text-lg lg:text-xl text-white mb-6 lg:mb-12 max-w-xl leading-relaxed font-medium drop-shadow-md"
            >
              {slides[currentSlide].description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-[#00bcd4] hover:bg-[#0097a7] text-white font-semibold px-8 py-3.5 lg:px-10 lg:py-4 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 text-center flex items-center gap-2.5 text-sm lg:text-base"
              >
                {showForm ? <X size={20} /> : <ChevronRight size={20} />}
                {showForm ? "Hide Form" : "Plan Your Journey"}
              </button>
            </motion.div>
          </motion.div>

          {/* Enquiry Form (Right Side) */}
          <div className={cn(
            "lg:col-span-5 w-full transition-all duration-500",
            showForm ? "block" : "hidden lg:block lg:opacity-0"
          )}>
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="max-h-[75vh] lg:max-h-[85vh] overflow-y-auto custom-scrollbar bg-white rounded-3xl lg:rounded-[2.5rem] shadow-2xl mx-auto w-full max-w-[500px] lg:max-w-none">
                    <button 
                      onClick={() => setShowForm(false)}
                      className="lg:hidden absolute top-4 right-4 z-20 w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-gray-800 backdrop-blur-md"
                    >
                      <X size={20} />
                    </button>
                    <EnquiryForm showTitle={false} className="!shadow-none !border-0 !rounded-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-90"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-90"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all duration-500 rounded-full ${
              currentSlide === idx ? "w-14 bg-gradient-to-r from-secondary to-cyan-300" : "w-8 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2">Scroll Down</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/80 via-white/40 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
