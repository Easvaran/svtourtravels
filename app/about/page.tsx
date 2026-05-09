"use client";

import Image from "next/image";
import { Award, Users, Globe, MapPin } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

export default function AboutPage() {
  const { settings } = useSettings();
  const stats = [
    { label: "Years Experience", value: "10+", icon: <Award size={24} /> },
    { label: "Happy Travelers", value: "50k+", icon: <Users size={24} /> },
    { label: "Destinations", value: "100+", icon: <Globe size={24} /> },
    { label: "Tour Packages", value: "500+", icon: <MapPin size={24} /> },
  ];

  return (
    <div className="pt-0">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="About Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-white">About Us</h1>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <span className="text-primary font-bold tracking-widest uppercase text-sm block">Who We Are</span>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Crafting Unforgettable <br />
                <span className="text-primary">Travel Experiences</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {settings.websiteName} was founded with a simple goal: to make world-class travel accessible, enjoyable, and stress-free. We believe that travel is more than just visiting places; it's about the stories you tell and the memories you create.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                  <p className="text-gray-600">To provide exceptional travel services that exceed our clients' expectations through personalized attention and expert guidance.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">To be the most trusted and preferred travel partner worldwide, recognized for our commitment to excellence and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
                <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Expertise */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose {settings.websiteName}?</h2>
            <p className="text-gray-500 text-lg">Our team of travel enthusiasts brings years of industry experience to help you plan the perfect getaway.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Personalized Service", desc: "Every traveler is unique, and so are our tour packages. We tailor everything to your needs." },
              { title: "Expert Guidance", desc: "Our team has first-hand knowledge of the destinations we offer, ensuring you get the best advice." },
              { title: "Value for Money", desc: "We leverage our industry relationships to provide you with the best rates without compromising on quality." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
