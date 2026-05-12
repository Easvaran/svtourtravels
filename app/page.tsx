"use client";

import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import PopularDestinations from "@/components/PopularDestinations";
import TravelPackages from "@/components/TravelPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

export default function Home() {
  const { settings } = useSettings();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tours")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTours(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative">
      <HeroSection />

      {/* Popular Destinations first for better flow */}
      <PopularDestinations />

      {/* Tours Grid Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Our Tours</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Discover Amazing <span className="text-primary">Destinations</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
              Explore our hand-picked tour packages designed to give you the best travel experience
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-[500px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100" 
                />
              ))}
            </div>
          ) : tours.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-primary/20"
            >
              <h3 className="text-2xl font-black text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-500 mb-6">Check back soon for new destinations!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {tours.map((tour: any, index: number) => (
                  <motion.div
                    key={tour._id || tour.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <TourCard {...tour} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Get a Quote</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                Can't Find Your <br />
                <span className="text-primary underline decoration-secondary decoration-wavy underline-offset-8">Dream Destination?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 font-medium">
                Don't worry! Our travel experts can create a custom itinerary just for you. Tell us your preferences, budget, and travel dates, and we'll handle the rest.
              </p>
              
              <div className="space-y-8">
                {[
                  "Personalized Itineraries tailored to you",
                  "Expert Travel Advice from local guides",
                  "No Hidden Charges, total transparency"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-black text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <EnquiryForm />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <Testimonials />

      {/* Final Call to Action */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-[0_40px_100px_rgba(8,112,184,0.4)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <SafeImage
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-8 leading-tight"
              >
                Ready to Start Your <br /> Next Adventure?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium"
              >
                Join thousands of happy travelers who explored the world with {settings.websiteName}. Your dream vacation is just a click away.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-6"
              >
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto bg-secondary text-primary font-black px-12 py-6 rounded-2xl hover:bg-yellow-400 transition-all text-xl shadow-2xl hover:-translate-y-1 text-center"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
