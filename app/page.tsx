"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  MapPin, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Globe, 
  Car, 
  Heart, 
  Phone 
} from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";
import HeroSection from "@/components/HeroSection";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

      {/* Tours Grid Section */}
      <section className="py-[60px] px-[20px] bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-[1200px] mx-auto">
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

      {/* Services Section */}
      <section className="py-[100px] px-[20px] bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#00bcd4] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
            >
              Premium Travel <span className="text-[#00bcd4]">Solutions</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1.5 bg-[#00bcd4] mx-auto rounded-full" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Customized Tour Packages", 
                desc: "Tailor-made itineraries designed to match your specific interests, budget, and travel style.",
                icon: Globe,
                color: "bg-blue-500/10 text-blue-600"
              },
              { 
                title: "Luxury Vehicle Fleet", 
                desc: "Wide range of premium cars and coaches for comfortable group travel with professional drivers.",
                icon: Car,
                color: "bg-[#00bcd4]/10 text-[#00bcd4]"
              },
              { 
                title: "Honeymoon Specials", 
                desc: "Romantic getaways to the world's most beautiful destinations with exclusive couple perks.",
                icon: Heart,
                color: "bg-pink-500/10 text-pink-600"
              },
              { 
                title: "Corporate Travel", 
                desc: "Efficient travel management for businesses, including conferences, meetings, and team outings.",
                icon: Users,
                color: "bg-indigo-500/10 text-indigo-600"
              },
              { 
                title: "Pilgrimage Tours", 
                desc: "Spiritually enriching journeys to sacred sites with organized facilities for a peaceful experience.",
                icon: MapPin,
                color: "bg-orange-500/10 text-orange-600"
              },
              { 
                title: "24/7 Roadside Support", 
                desc: "Round-the-clock assistance for all our travelers to ensure a safe and worry-free journey.",
                icon: Phone,
                color: "bg-green-500/10 text-green-600"
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-[#00bcd4]/10 transition-all duration-500 group"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110", service.color)}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <Testimonials />

      {/* Final Call to Action */}
      <section className="py-[80px] px-[20px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-primary rounded-[4rem] relative overflow-hidden text-center text-white shadow-[0_40px_100px_rgba(8,112,184,0.4)]">
            <div className="absolute inset-0 pointer-events-none">
              <SafeImage
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
                alt="Background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 py-[80px] px-[20px]">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[42px] font-bold text-[#ffffff] mb-8 leading-tight"
              >
                Ready to Start Your <br /> Next Adventure?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[rgba(255,255,255,0.8)] text-xl mb-12 max-w-2xl mx-auto font-medium"
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
                  className="w-full sm:w-auto bg-[#00bcd4] text-white font-black px-12 py-6 rounded-2xl hover:bg-[#0097a7] transition-all text-xl shadow-2xl hover:-translate-y-1 text-center"
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
