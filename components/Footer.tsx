"use client";

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

  return (
    <footer className="bg-[#0870b8] text-blue-50 pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        {/* Brand Section */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center space-x-2 group">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto bg-white p-1 rounded-xl shadow-lg" />
            ) : (
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary font-black text-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-white/20">
                {settings.websiteName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-black text-2xl text-white tracking-tighter leading-none">
                {settings.websiteName.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-200">
                Explore | Discover
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed font-medium text-blue-100">
            Discover breathtaking destinations and create unforgettable memories with our expert-led tour packages.
          </p>
          <div className="flex items-center space-x-4">
            {settings.socialLinks.facebook && (
              <a href={settings.socialLinks.facebook} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Facebook size={18} />
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a href={settings.socialLinks.instagram} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Instagram size={18} />
              </a>
            )}
            {settings.socialLinks.twitter && (
              <a href={settings.socialLinks.twitter} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Twitter size={18} />
              </a>
            )}
            {settings.socialLinks.youtube && (
              <a href={settings.socialLinks.youtube} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Youtube size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-black text-xl mb-8 uppercase tracking-widest text-sm">Quick Links</h3>
          <ul className="space-y-4 font-medium">
            <li><Link href="/about" className="hover:text-secondary transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-secondary" /> About Us</Link></li>
            <li><Link href="/tours" className="hover:text-secondary transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-secondary" /> All Tours</Link></li>
            <li><Link href="/packages" className="hover:text-secondary transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-secondary" /> Packages</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-secondary" /> Contact</Link></li>
          </ul>
        </div>

        {/* Popular Tours */}
        <div>
          <h3 className="text-white font-black text-xl mb-8 uppercase tracking-widest text-sm">Destinations</h3>
          <ul className="space-y-4 font-medium">
            <li><Link href="/tours" className="hover:text-secondary transition-colors">Ooty Hill Station</Link></li>
            <li><Link href="/tours" className="hover:text-secondary transition-colors">Kodaikanal Lake</Link></li>
            <li><Link href="/tours" className="hover:text-secondary transition-colors">Kerala Backwaters</Link></li>
            <li><Link href="/tours" className="hover:text-secondary transition-colors">Goa Beaches</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-white font-black text-xl mb-8 uppercase tracking-widest text-sm">Contact Info</h3>
          <ul className="space-y-6 font-medium">
            <li className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <MapPin size={20} />
              </div>
              <span className="text-sm leading-relaxed text-blue-50">{settings.address}</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <Phone size={20} />
              </div>
              <span className="text-sm text-blue-50">{settings.contactPhone}</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <Mail size={20} />
              </div>
              <span className="text-sm text-blue-50">{settings.contactEmail}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200 font-medium">
        <p>© {new Date().getFullYear()} {settings.websiteName.toUpperCase()}. All Rights Reserved.</p>
        <div className="flex space-x-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
