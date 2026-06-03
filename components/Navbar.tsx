"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/SettingsContext";

const Navbar = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tariff", href: "/tariff" },
    { name: "Tours", href: "/tours" },
    { name: "Services", href: "/services" },
    { name: "Why Us", href: "/why-us" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 px-4 py-3 bg-[#0870b8] shadow-lg border-b border-white/10 transition-all duration-500"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          {settings.logoUrl ? (
            <img 
              src={settings.logoUrl} 
              alt="Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                console.error("Logo failed to load:", settings.logoUrl);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : null}
          {(!settings.logoUrl || !settings.logoUrl.trim()) && (
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white font-semibold text-xl group-hover:rotate-12 transition-transform shadow-lg border border-white/20">
              {settings.websiteName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter leading-none transition-colors text-white">
              {settings.websiteName.toUpperCase()}
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase transition-colors text-white/70">
              Explore | Discover
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 font-medium text-sm transition-all group overflow-hidden rounded-full text-white/90 hover:text-white",
                  isActive && "text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={cn(
                  "absolute inset-0 transition-transform origin-left duration-300",
                  isActive ? "bg-white/20 scale-x-100" : "bg-white/10 scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-4 bg-[#00bcd4] hover:bg-[#0097a7] text-white font-medium px-6 py-2.5 rounded-full flex items-center space-x-2 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 border border-white/10"
          >
            <span className="text-sm">Book Now</span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href={`tel:8668076871`}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Phone size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Call Us</span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">86680 76871</span>
            </div>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors text-white bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to block background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[39] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Slide-out Menu */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-[400px] z-[9999] bg-white shadow-2xl flex flex-col p-6 md:hidden border-l border-gray-100"
              style={{ backgroundColor: 'white' }}
            >
              <div className="flex justify-between items-center mb-10">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                  {settings.logoUrl ? (
                    <img 
                      src={settings.logoUrl} 
                      alt="Logo" 
                      className="h-9 w-auto object-contain"
                      onError={(e) => {
                        console.error("Mobile logo failed to load:", settings.logoUrl);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  {(!settings.logoUrl || !settings.logoUrl.trim()) && (
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                      {settings.websiteName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="font-bold text-xl text-primary tracking-tight">
                    {settings.websiteName.toUpperCase()}
                  </span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={28} className="text-gray-800" />
                </button>
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group text-base font-medium flex items-center justify-between px-5 py-4 rounded-2xl transition-all",
                          isActive 
                            ? "bg-gradient-to-r from-primary/10 to-blue-50 text-primary border border-primary/20" 
                            : "text-gray-800 hover:bg-gray-50"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronRight size={18} className={cn("opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0", isActive && "opacity-100 translate-x-0")} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 space-y-4 px-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm md:text-base font-medium whitespace-nowrap w-full bg-[#00bcd4] hover:bg-[#0097a7] text-white shadow-xl shadow-[#00bcd4]/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Book Your Trip
                </Link>
                
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Contact Us</p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`tel:8668076871`}
                      className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <a 
                      href={`https://wa.me/918668076871`}
                      target="_blank"
                      className="w-12 h-12 bg-green-50 hover:bg-green-500 hover:text-white text-green-600 rounded-2xl flex items-center justify-center transition-all"
                    >
                      <MessageSquare size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
