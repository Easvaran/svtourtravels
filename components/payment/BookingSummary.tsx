"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Car, 
  IndianRupee, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Package
} from "lucide-react";

interface BookingSummaryProps {
  booking: any;
}

export default function BookingSummary({ booking }: BookingSummaryProps) {
  if (!booking) return null;

  const advanceAmount = Math.round(booking.totalAmount * 0.1);
  const remainingAmount = booking.totalAmount - advanceAmount;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8 h-full"
    >
      <div>
        <div className="flex items-center space-x-2 text-primary font-black tracking-[0.2em] uppercase text-[10px] mb-2">
          <ShieldCheck size={14} />
          <span>Booking Summary</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Review Your <span className="text-primary">Trip Details</span></h2>
      </div>

      <div className="space-y-4">
        {/* Tour Detail */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Destination</p>
            <p className="text-base font-black text-gray-900">{booking.destination}</p>
          </div>
        </div>

        {/* Vehicle Detail */}
        {booking.vehicleName && (
          <div className="flex items-center space-x-4 p-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <Car size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">Selected Vehicle</p>
              <p className="text-base font-black text-gray-900">{booking.vehicleName}</p>
            </div>
          </div>
        )}

        {/* Date & People Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Travel Date</p>
            <div className="flex items-center space-x-2 font-black text-gray-900">
              <Calendar size={16} className="text-primary" />
              <span>{booking.travelDate}</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Travellers</p>
            <div className="flex items-center space-x-2 font-black text-gray-900">
              <Users size={16} className="text-primary" />
              <span>{booking.people} People</span>
            </div>
          </div>
        </div>

        {/* Package & Duration Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Duration</p>
            <div className="flex items-center space-x-2 font-black text-gray-900">
              <Clock size={16} className="text-primary" />
              <span>{booking.days} Days</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Package</p>
            <div className="flex items-center space-x-2 font-black text-gray-900">
              <Package size={16} className="text-primary" />
              <span>{booking.packageType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-gray-900 rounded-[2rem] p-8 text-white space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
        
        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/50 border-b border-white/10 pb-4">Pricing Breakdown</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-white/70">
            <span className="text-xs font-bold uppercase tracking-widest">Total Trip Price</span>
            <span className="font-black">₹{booking.totalAmount.toLocaleString()}</span>
          </div>

          {booking.paymentType === "advance" ? (
            <>
              <div className="flex justify-between items-center text-primary font-black pt-2">
                <span className="text-xs uppercase tracking-widest">Payable Now (10%)</span>
                <span className="text-2xl">₹{advanceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-white/50 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest">Remaining Balance</span>
                <span className="text-sm font-black">₹{remainingAmount.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center text-primary font-black pt-2">
              <span className="text-xs uppercase tracking-widest">Payable Now</span>
              <span className="text-2xl">₹{booking.totalAmount.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="pt-4 flex items-center space-x-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
          <CheckCircle2 size={12} className="text-green-500" />
          <span>Secure checkout guaranteed</span>
        </div>
      </div>
    </motion.div>
  );
}
