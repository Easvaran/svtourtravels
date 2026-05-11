"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { Search, MapPin, Calendar, Users, ChevronRight, ChevronLeft, Phone, Briefcase, Clock, ChevronDown, User } from "lucide-react";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "",
    travelDate: "",
    days: "",
    people: "",
    packageType: "Budget"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.destination || !formData.travelDate || !formData.days || !formData.people) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Enquiry sent successfully! We will contact you soon.");
        setFormData({
          name: "",
          phone: "",
          destination: "",
          travelDate: "",
          days: "",
          people: "",
          packageType: "Budget"
        });
      } else {
        toast.error(data.message || "Failed to send enquiry");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <SafeImage
            src={slides[currentSlide].image}
            alt="Travel Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.3em] text-secondary uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              Explore | Discover | Travel
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
              {slides[currentSlide].title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed font-medium">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/tours" className="bg-primary hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_20px_50px_rgba(8,112,184,0.4)] hover:-translate-y-1 active:scale-95 text-center">
                Start Exploring
              </Link>
            </div>
          </motion.div>

          {/* Integrated Quick Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block bg-white/95 backdrop-blur-xl p-8 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] border border-white/20 w-full max-w-md ml-auto"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Book Your Trip</h3>
              <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Get a personalized quote today</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Your Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={16} />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm placeholder:text-gray-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Destination</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={16} />
                  <input 
                    required
                    type="text" 
                    placeholder="Where do you want to go?"
                    className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm placeholder:text-gray-400"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Travel Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform z-10" size={16} />
                    <input 
                      required
                      type="date" 
                      className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm appearance-none relative"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Travel Days</label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={16} />
                    <input 
                      required
                      type="number" 
                      min="1"
                      placeholder="Ex: 3"
                      className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm placeholder:text-gray-400"
                      value={formData.days}
                      onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Travelers</label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={16} />
                    <input 
                      required
                      type="number" 
                      min="1"
                      placeholder="Ex: 2"
                      className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm placeholder:text-gray-400"
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Package Type</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform z-10" size={16} />
                    <select 
                      className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm appearance-none cursor-pointer relative"
                      value={formData.packageType}
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    >
                      <option>Budget</option>
                      <option>Premium</option>
                      <option>Luxury</option>
                      <option>Custom</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 block">Contact No.</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={16} />
                  <input 
                    required
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="w-full h-11 bg-gray-100/50 border-2 border-transparent focus:border-primary/10 focus:bg-white rounded-xl pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-sm placeholder:text-gray-400"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-[0_20px_40px_rgba(8,112,184,0.3)] transition-all hover:-translate-y-1 active:scale-[0.98] mt-2 flex items-center justify-center space-x-3 group/btn disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-base">Get a Free Quote</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 left-12 z-20 flex space-x-4">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentSlide === idx ? "w-12 bg-secondary" : "w-6 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center opacity-50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
