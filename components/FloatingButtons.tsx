"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

const FloatingButtons = () => {
  const { settings } = useSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end space-y-4">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/918668076871?text=${encodeURIComponent("Hi I want to book a tour")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] relative group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:hidden" />
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-[#0f172a] text-white font-bold px-4 py-2 rounded-xl text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 hidden lg:block">
          Chat with us
        </span>
      </motion.a>

      {/* Call Button (Mobile Only) */}
      <motion.a
        href={`tel:${settings.contactPhone}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(8,112,184,0.4)]"
      >
        <Phone size={28} />
      </motion.a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-white text-primary border border-gray-100 rounded-full flex items-center justify-center shadow-2xl group"
          >
            <ArrowUp size={28} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;
