"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";
import { ChevronRight, ChevronLeft, X, Globe, MapPin, Users } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-0">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl animate-float" />

      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 z-0"
        >
          <SafeImage
            src={slides[currentSlide].image}
            alt="Travel Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-mesh" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-3 border-white/20 flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-primary-600 border-3 border-white/20 flex items-center justify-center">
                  <Globe size={18} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-accent-600 border-3 border-white/20 flex items-center justify-center">
                  <MapPin size={18} className="text-white" />
                </div>
              </div>
              <span className="text-white/80 font-semibold text-sm">5000+ Happy Travelers</span>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-block px-5 py-2 mb-6 text-xs font-black tracking-[0.35em] text-cyan-300 uppercase bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
            >
              Explore • Discover • Travel
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-5 md:mb-7 leading-[1.05] tracking-tight"
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
              className="text-base md:text-lg lg:text-xl text-gray-200 mb-10 md:mb-12 max-w-xl leading-relaxed font-medium"
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
                className="bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-black px-9 py-4.5 md:px-12 md:py-5 rounded-3xl transition-all hover:shadow-[0_30px_80px_rgba(14,165,233,0.45)] hover:-translate-y-1.5 active:scale-[0.97] text-center flex items-center gap-2.5 btn-glow"
              >
                {showForm ? <X size={22} /> : <ChevronRight size={22} />}
                {showForm ? "Hide Form" : "Plan Your Journey"}
              </button>
            </motion.div>
          </motion.div>

          {/* Enquiry Form (Right Side / Mobile: Below) */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.92 }}
                transition={{ duration: 0.6, type: "spring", damping: 20 }}
              >
                <EnquiryForm showTitle={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="hidden md:flex absolute bottom-12 left-12 z-20 space-x-4">
        <button 
          onClick={prevSlide}
          className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-90"
        >
          <ChevronLeft size={26} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-90"
        >
          <ChevronRight size={26} />
        </button>
      </div>

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
