"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, role, content, image, rating }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-primary">
        <Quote size={80} />
      </div>

      <div className="flex items-center space-x-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "text-secondary fill-secondary" : "text-gray-200"}
          />
        ))}
      </div>

      <p className="text-gray-600 italic mb-8 leading-relaxed relative z-10">
        "{content}"
      </p>

      <div className="flex items-center space-x-4">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-primary font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
