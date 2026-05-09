"use client";

import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { Clock, Star, ArrowRight, MessageCircle, MapPin } from "lucide-react";

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
  const whatsappLink = `https://wa.me/919025335720?text=${encodeURIComponent(`Hi, I am interested in ${title} tour package.`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <SafeImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-6 left-6 bg-secondary text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
            Popular Choice
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-primary">
            <Clock size={16} />
            <span className="text-xs font-black uppercase tracking-widest">{duration}</span>
          </div>
          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Star size={14} className="text-secondary fill-secondary" />
            <span className="text-gray-900 font-black text-xs">{rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Starting from</p>
            <p className="text-2xl font-black text-gray-900">₹{price}</p>
          </div>
          <div className="flex gap-2">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
            >
              <MessageCircle size={20} />
            </a>
            <Link
              href={`/tours/${slug}`}
              className="p-4 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
            >
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
