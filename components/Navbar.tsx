"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
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
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  SV
                </div>
                <span className="font-bold text-xl text-primary tracking-tight">
                  TOUR & TRAVELS
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-primary bg-primary/5 rounded-xl">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-black flex items-center justify-between group px-4 py-2 rounded-xl transition-colors",
                        isActive ? "text-yellow-600 bg-yellow-400/20" : "text-gray-900"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                      <span className={cn(
                        "w-12 h-1 bg-yellow-400 transition-transform origin-right",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )} />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  className="w-full bg-primary text-white text-center font-bold py-5 rounded-2xl shadow-xl block"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </motion.div>
            </div>

            <div className="mt-auto pt-12 border-t border-gray-100">
              <p className="text-gray-500 font-bold mb-4">Connect With Us</p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <Phone size={20} />
                </div>
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <MessageSquare size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
