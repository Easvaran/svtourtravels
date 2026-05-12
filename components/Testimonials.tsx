"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Quote, Plus } from "lucide-react";
import ReviewModal from "./modals/ReviewModal";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews]);

  return (
    <section className="py-[60px] px-[20px] bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchReviews} 
      />
      
      <div className="max-w-[1200px] mx-auto">
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
          <p className="text-gray-500 text-lg font-medium mb-8">
            See what our customers have to say about their incredible experiences
          </p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-[#00bcd4] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#00bcd4]/20 hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            <span>Write a Review</span>
          </motion.button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <>
            {/* Mobile: Grid of all testimonials */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {reviews.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-6">
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
                    {reviews[currentIndex].tour && (
                      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                        📍 {reviews[currentIndex].tour}
                      </p>
                    )}
                    
                    <div className="flex justify-center space-x-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < reviews[currentIndex].rating ? "text-secondary fill-secondary" : "text-gray-200"}
                        />
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-700 font-medium italic mb-10 leading-relaxed">
                      "{reviews[currentIndex].review}"
                    </p>

                    <div>
                      <h4 className="text-2xl font-black text-gray-900">{reviews[currentIndex].name}</h4>
                      <p className="text-primary font-bold uppercase tracking-widest text-xs mt-2">Verified Traveler</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-12 space-x-3">
                {reviews.map((_, idx) => (
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
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

