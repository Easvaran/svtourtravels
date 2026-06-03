"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Users, 
  Globe, 
  Car, 
  Heart, 
  Phone 
} from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";
import HeroSection from "@/components/HeroSection";
import TariffSection from "@/components/TariffSection";
import ToursSection from "@/components/ToursSection";
import ServicesSection from "@/components/ServicesSection";
import EnquiryForm from "@/components/EnquiryForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const { settings } = useSettings();

  return (
    <div className="relative">
      <HeroSection />

      <TariffSection />

      <ToursSection />

      <ServicesSection />

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
