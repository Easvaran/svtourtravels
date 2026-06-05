"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";
import TaxiQuoteForm from "./TaxiQuoteForm";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop", // Car driving
    title: "Affordable One Way Drop Taxi",
    subtitle: "Across Tamil Nadu, Pondicherry & Bangalore",
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop", // Highway
    title: "Comfortable Outstation Trips",
    subtitle: "Best Prices Guaranteed",
  },
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", // Travel
    title: "Your Trusted Travel Partner",
    subtitle: "Safe & Reliable Taxi Service",
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
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
            alt="Taxi Service Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center pt-28 pb-12 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left flex flex-col items-center lg:items-start"
          >
            <AnimatePresence mode="wait">
              <motion.h1 
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 lg:mb-8 leading-[1.2] tracking-tight text-center lg:text-left"
              >
                {slides[currentSlide].title}<br className="hidden md:block" />
                <span className="text-[#00bcd4]">{slides[currentSlide].subtitle}</span>
              </motion.h1>
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full sm:w-auto"
            >
              <a 
                href="tel:8668076871"
                className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg w-full sm:w-auto"
              >
                <Phone size={24} />
                Call: 86680 76871
              </a>
            </motion.div>
          </motion.div>

          {/* Taxi Quote Form (Right Side) */}
          <motion.div
            id="booking-form"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <TaxiQuoteForm />
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              currentSlide === index ? "w-8 bg-emerald-500" : "w-4 bg-white/30"
            )}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center hidden lg:flex"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2">Scroll Down</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/80 via-white/40 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
