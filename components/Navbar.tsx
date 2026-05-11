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
    { name: "Tours", href: "/tours" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500 px-4 py-3",
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-2 border-b border-primary/10" 
          : "bg-[#0870b8]/90 backdrop-blur-lg border-b border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto" />
          ) : (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform shadow-lg">
              {settings.websiteName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <span className={cn(
              "font-black text-xl tracking-tighter leading-none transition-colors",
              scrolled ? "text-primary" : "text-white"
            )}>
              {settings.websiteName.toUpperCase()}
            </span>
            <span className={cn(
              "text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
              scrolled ? "text-gray-500" : "text-white/70"
            )}>
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
                  "relative px-4 py-2 font-bold text-sm transition-all group overflow-hidden rounded-full",
                  scrolled ? "text-gray-700" : "text-white",
                  isActive && "text-primary"
                )}
              >
                <span className="relative z-10 group-hover:text-primary transition-colors">{link.name}</span>
                <span className={cn(
                  "absolute inset-0 transition-transform origin-left duration-300",
                  isActive ? "bg-yellow-400 scale-x-100" : "bg-primary/10 scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-4 bg-primary hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full flex items-center space-x-2 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <span className="text-sm">Book Now</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors", 
            scrolled ? "text-primary bg-primary/5" : "text-white bg-white/10"
          )}
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
              className="fixed inset-y-0 right-0 w-[85%] max-w-[400px] z-[40] bg-white shadow-2xl flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="h-9 w-auto" />
                  ) : (
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {settings.websiteName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="font-black text-xl text-primary tracking-tight">
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
                          "group text-base font-black flex items-center justify-between px-5 py-4 rounded-2xl transition-all",
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

              <div className="mt-8 space-y-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary hover:bg-blue-700 text-white text-center font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  Book Your Trip
                </Link>
                
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Contact Us</p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`tel:${settings.contactPhone}`}
                      className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <a 
                      href={`https://wa.me/${settings.whatsappNumber}`}
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
