"use client";

import Image from "next/image";
import { Award, Users, Globe, MapPin } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";
import { cn } from "@/lib/utils";

export default function AboutClient() {
  const { settings } = useSettings();
  const stats = [
    { label: "Years Experience", value: "10+", icon: <Award size={24} /> },
    { label: "Happy Travelers", value: "50k+", icon: <Users size={24} /> },
    { label: "Destinations", value: "100+", icon: <Globe size={24} /> },
    { label: "Tour Packages", value: "500+", icon: <MapPin size={24} /> },
  ];

  return (
    <div className="pt-0 font-poppins">
      {/* Header */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="About SV Tour and Travels"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f172a]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tighter" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>About Us</h1>
          <div className="w-24 h-1.5 bg-[#00bcd4] mx-auto rounded-full shadow-lg shadow-[#00bcd4]/30" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00bcd4]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
                alt="Our Team at SV Tour and Travels"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
            </div>
            <div className="space-y-8">
              <span className="text-[#00bcd4] font-bold tracking-[0.3em] uppercase text-sm block">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Crafting Unforgettable <br />
                <span className="text-[#00bcd4]">Travel Experiences</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                {settings.websiteName} was founded with a simple goal: to make world-class travel accessible, enjoyable, and stress-free. We believe that travel is more than just visiting places; it's about the stories you tell and the memories you create.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#00bcd4]/10 rounded-xl flex items-center justify-center text-[#00bcd4]">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Mission</h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">To provide exceptional travel services that exceed our clients' expectations through personalized attention and expert guidance.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#00bcd4]/10 rounded-xl flex items-center justify-center text-[#00bcd4]">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">To be the most trusted and preferred travel partner worldwide, recognized for our commitment to excellence and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group p-8 rounded-[2.5rem] hover:bg-gray-50 transition-all duration-300">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-[#00bcd4] group-hover:text-white transition-all duration-500 text-[#00bcd4]">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Expertise */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#00bcd4] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-[#00bcd4] mx-auto rounded-full mb-8" />
            <p className="text-gray-500 text-lg font-medium">Our team of travel enthusiasts brings years of industry experience to help you plan the perfect getaway.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Personalized Service", desc: "Every traveler is unique, and so are our tour packages. We tailor everything to your needs.", color: "from-cyan-400 to-blue-500" },
              { title: "Expert Guidance", desc: "Our team has first-hand knowledge of the destinations we offer, ensuring you get the best advice.", color: "from-blue-500 to-indigo-600" },
              { title: "Value for Money", desc: "We leverage our industry relationships to provide you with the best rates without compromising on quality.", color: "from-indigo-600 to-purple-600" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-2 transition-all duration-300 group">
                <div className={cn("w-14 h-1.5 rounded-full mb-8 bg-gradient-to-r", item.color)} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00bcd4] transition-colors">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}