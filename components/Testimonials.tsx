"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonialData } from "@/lib/data";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Reviews
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Loved by Our <span className="text-primary">Travelers</span>
          </motion.h2>
          <p className="text-gray-500 text-lg font-medium">
            See what our customers have to say about their incredible experiences
          </p>
        </div>

        {/* Mobile: Grid of all testimonials */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {testimonialData.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-primary/10 flex-shrink-0">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">{testimonial.name}</h4>
                  {testimonial.tour && (
                    <p className="text-primary font-bold text-sm">📍 {testimonial.tour}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-secondary fill-secondary" : "text-gray-200"}
                  />
                ))}
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                "{testimonial.review}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Carousel */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-primary/10">
            <Quote size={120} fill="currentColor" />
          </div>
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl text-center"
              >
                <div className="flex justify-center mb-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                    <Image
                      src={testimonialData[currentIndex].photo}
                      alt={testimonialData[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {testimonialData[currentIndex].tour && (
                  <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                    📍 {testimonialData[currentIndex].tour}
                  </p>
                )}
                
                <div className="flex justify-center space-x-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < testimonialData[currentIndex].rating ? "text-secondary fill-secondary" : "text-gray-200"}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-700 font-medium italic mb-10 leading-relaxed">
                  "{testimonialData[currentIndex].review}"
                </p>

                <div>
                  <h4 className="text-2xl font-black text-gray-900">{testimonialData[currentIndex].name}</h4>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs mt-2">Verified Traveler</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {testimonialData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all duration-500 rounded-full ${
                  currentIndex === idx ? "w-10 bg-primary" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
