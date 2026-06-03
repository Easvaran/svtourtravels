"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { 
  Clock, 
  Star, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Users, 
  IndianRupee,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  Zap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tours as staticTours } from "@/lib/data";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import VehicleSelector from "@/components/VehicleSelector";
import { Vehicle } from "@/lib/vehicles";

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [tour, setTour] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        const found = data.find((t: any) => t.slug === slug);
        
        if (found) {
          setTour(found);
        } else {
          // Fallback to static data
          const staticFound = staticTours.find(t => t.slug === slug);
          setTour(staticFound || null);
        }
      } catch (error) {
        // Fallback to static data
        const staticFound = staticTours.find(t => t.slug === slug);
        setTour(staticFound || null);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900">Loading your adventure...</h2>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={48} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-500 mb-8 font-medium">Sorry, we couldn't find the tour you're looking for. It might have been moved or removed.</p>
          <Link href="/tours" className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-2xl font-black transition-all hover:shadow-lg">
            <ArrowLeft size={20} />
            <span>Back to All Tours</span>
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMsg = `Hi, I am interested in ${tour.title} package. Please provide more details.`;
  const whatsappLink = `https://wa.me/918668076871?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <SafeImage
          src={tour.images?.[activeImage] || tour.image}
          alt={tour.title}
          fill
          priority
          className="object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white font-bold transition-colors mb-4"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-secondary text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {tour.location}
                </span>
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <Star size={14} className="text-secondary fill-secondary" />
                  <span className="text-white font-bold text-xs">{tour.rating}</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <Clock size={14} className="text-white" />
                  <span className="text-white font-bold text-xs">{tour.duration}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight">
                {tour.title}
              </h1>

              <div className="flex items-center space-x-2">
                <p className="text-white/60 font-medium">Starts from</p>
                <p className="text-4xl font-black text-secondary">₹{tour.price}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Image Gallery Thumbnails */}
            {tour.images && tour.images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-x-auto"
              >
                {tour.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-4 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-60'}`}
                  >
                    <SafeImage src={img} alt={`${tour.title} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Description & Highlights */}
            <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-gray-900">Tour Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  {tour.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                    <Zap className="text-primary" size={24} />
                    <span>Highlights</span>
                  </h3>
                  <ul className="space-y-4">
                    {tour.highlights?.map((h: string, i: number) => (
                      <li key={i} className="flex items-start space-x-3 group">
                        <div className="mt-1 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                          <CheckCircle2 size={12} className="text-green-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-gray-700 font-bold">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                    <Info className="text-primary" size={24} />
                    <span>Quick Info</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="font-bold text-gray-900">{tour.location}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                      <p className="font-bold text-gray-900">{tour.duration}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Category</p>
                      <p className="font-bold text-gray-900">Hill Station</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-secondary fill-secondary" />
                        <span className="font-bold text-gray-900">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Itinerary Timeline */}
            <section className="space-y-10">
              <h2 className="text-3xl font-black text-gray-900 px-4">Day-wise Itinerary</h2>
              <div className="relative space-y-8 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200 before:dashed">
                {tour.itinerary?.map((day: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-24 group"
                  >
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-primary rounded-3xl flex flex-col items-center justify-center shadow-xl group-hover:bg-primary transition-colors duration-500 z-10">
                      <span className="text-[10px] font-black text-gray-400 uppercase leading-none group-hover:text-white/60">Day</span>
                      <span className="text-2xl font-black text-primary leading-none group-hover:text-white">{day.day}</span>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-lg shadow-gray-200/50 border border-gray-100 group-hover:border-primary/20 transition-all">
                      <h3 className="text-xl font-black text-gray-900 mb-3">{day.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{day.description || day.plan}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50/50 p-10 rounded-[3rem] border border-green-100 space-y-6">
                <h3 className="text-xl font-black text-green-700 flex items-center space-x-2">
                  <CheckCircle2 size={24} />
                  <span>Price Includes</span>
                </h3>
                <ul className="space-y-4">
                  {tour.includes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center space-x-3 text-green-800 font-bold">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50/50 p-10 rounded-[3rem] border border-red-100 space-y-6">
                <h3 className="text-xl font-black text-red-700 flex items-center space-x-2">
                  <XCircle size={24} />
                  <span>Price Excludes</span>
                </h3>
                <ul className="space-y-4">
                  {tour.excludes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center space-x-3 text-red-800 font-bold">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-6">
            <div className="sticky top-28 space-y-8">
              
              {/* Booking Form Card */}
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-primary/10 border border-gray-100 overflow-hidden">
                <div className="bg-primary p-8 text-white text-center">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Book This Tour</p>
                  <h3 className="text-3xl font-black">₹{tour.price} <span className="text-sm font-medium opacity-60">/ Person</span></h3>
                </div>
                
                <div className="p-8 space-y-6">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-green-500/20 active:scale-95"
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp Enquiry</span>
                  </a>
                  
                  <div className="relative text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <span className="relative bg-white px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Or Send Enquiry</span>
                  </div>

                  <EnquiryForm 
                    className="shadow-none border-none p-0 md:p-0 rounded-none" 
                    tourTitle={tour.title}
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20">
                <h4 className="font-black text-primary mb-4 flex items-center space-x-2">
                  <Star size={18} className="fill-primary" />
                  <span>Why book with us?</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    "100% Customized Trips",
                    "Expert Local Guides",
                    "No Hidden Charges",
                    "24/7 Travel Support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Vehicle Selection Section */}
        <section className="mt-24 pt-24 border-t border-gray-100">
          <VehicleSelector 
            selectedVehicleId={selectedVehicle?.id || null}
            onSelectVehicle={(vehicle) => {
              if (selectedVehicle?.id === vehicle.id) {
                setSelectedVehicle(null);
              } else {
                setSelectedVehicle(vehicle);
              }
            }}
          />
        </section>

        {/* Related Tours Section */}
        <section className="mt-24 pt-24 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Recommended</span>
              <h2 className="text-4xl font-black text-gray-900">Similar Adventures</h2>
            </div>
            <Link href="/tours" className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
              <span>View All Tours</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticTours.filter(t => t.slug !== slug).slice(0, 3).map((tour: any) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
