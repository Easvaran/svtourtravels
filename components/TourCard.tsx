"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { Clock, Star, ArrowRight, MessageCircle } from "lucide-react";

interface TourCardProps {
  _id?: string;
  title: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  slug: string;
  description: string;
  featured?: boolean;
}

const TourCard = ({ title, image, price, duration, rating, slug, description, featured }: TourCardProps) => {
  const whatsappLink = `https://wa.me/918668076871?text=${encodeURIComponent(`Hi, I am interested in ${title} tour package.`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-gray-100 group flex flex-col h-full card-hover relative"
    >
      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <div className="relative h-64 overflow-hidden">
        <SafeImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 image-hover"
        />
        {featured && (
          <div className="absolute top-5 left-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[10px] font-black uppercase tracking-[0.25em] px-5 py-2.5 rounded-full shadow-2xl">
            ✨ Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-2xl border border-primary-100">
            <Clock size={15} className="text-primary-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary-700">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 px-3.5 py-1.5 rounded-2xl border border-amber-100">
            <Star size={14} className="text-accent-500 fill-accent-500" />
            <span className="text-gray-900 font-black text-sm">{rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-7 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
          <div>
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-primary-600">₹</span>
              <span className="text-3xl font-black text-gray-900">{price}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl hover:shadow-green-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle size={19} />
            </a>
            <Link
              href={`/tours/${slug}`}
              className="p-3.5 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
