"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Send
} from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        if (Array.isArray(data)) {
          setTours(data.filter((t: any) => t.status === "active").slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch tours for footer:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <footer className="bg-[#0f172a] text-white py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-3 group">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto bg-white p-1.5 rounded-xl shadow-lg" />
            ) : (
              <div className="w-12 h-12 bg-[#00bcd4] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#00bcd4]/20">
                {settings.websiteName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-white tracking-tight">
                {settings.websiteName.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00bcd4]">
                Explore | Discover
              </span>
            </div>
          </Link>
          <p className="text-gray-300 text-[15px] leading-relaxed font-medium">
            Discover breathtaking destinations and create unforgettable memories with our expert-led tour packages.
          </p>
          <div className="flex items-center space-x-4">
            {settings.socialLinks.facebook && (
              <a href={settings.socialLinks.facebook} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#00bcd4] hover:border-[#00bcd4] transition-all">
                <Facebook size={18} />
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a href={settings.socialLinks.instagram} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#00bcd4] hover:border-[#00bcd4] transition-all">
                <Instagram size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest border-b border-[#00bcd4]/30 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-4 font-medium">
            <li><Link href="/" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Home</Link></li>
            <li><Link href="/tariff" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Tariff</Link></li>
            <li><Link href="/tours" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Tours</Link></li>
            <li><Link href="/services" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Services</Link></li>
            <li><Link href="/why-us" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Why Us</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Contact Us</Link></li>
          </ul>
        </div>

        {/* Popular Tours */}
        <div>
          <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest border-b border-[#00bcd4]/30 pb-2 inline-block">Popular Routes</h3>
          <ul className="space-y-4 font-medium">
            {tours.length > 0 ? (
              tours.map((tour) => (
                <li key={tour._id}>
                  <Link 
                    href="/tours" 
                    className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> 
                    {tour.from} → {tour.to}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li><Link href="/tours" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Ooty → Bangalore</Link></li>
                <li><Link href="/tours" className="text-gray-300 hover:text-[#00bcd4] transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 text-[#00bcd4]" /> Chennai → Madurai</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest border-b border-[#00bcd4]/30 pb-2 inline-block">Contact Info</h3>
          <ul className="space-y-6 font-medium">
            <li className="flex items-start space-x-4 group">
              <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#00bcd4]/20 group-hover:scale-110 transition-transform">
                <MapPin size={18} />
              </div>
              <span className="text-gray-300 leading-relaxed text-[14px]">{settings.address}</span>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#00bcd4]/20 group-hover:scale-110 transition-transform">
                <Phone size={18} />
              </div>
              <span className="text-gray-300 text-[14px]">{settings.contactPhone}</span>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#00bcd4]/20 group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <span className="text-gray-300 text-[14px]">{settings.contactEmail}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white font-bold">
        <p>© {new Date().getFullYear()} {settings.websiteName.toUpperCase()}. All Rights Reserved.</p>
        <div className="flex space-x-8">
          <Link href="#" className="text-white hover:text-[#00bcd4] transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-white hover:text-[#00bcd4] transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
