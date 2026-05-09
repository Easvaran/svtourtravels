"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Car, Loader2 } from "lucide-react";
import BookingSummary from "@/components/payment/BookingSummary";
import PaymentButton from "@/components/payment/PaymentButton";
import Link from "next/link";

export default function PaymentOptionsPage() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tempBooking = sessionStorage.getItem("temp_booking");
    if (!tempBooking) {
      router.push("/");
      return;
    }
    setBooking(JSON.parse(tempBooking));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50">
        <Loader2 size={48} className="text-primary animate-spin" />
        <p className="text-gray-500 font-black uppercase tracking-[0.2em] animate-pulse">Initializing Checkout...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        <Link 
          href={`/tours/${booking.destination.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          <span>Back to Tour Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <BookingSummary booking={booking} />
          <PaymentButton booking={booking} />
        </div>

        {/* Footer Guarantee */}
        <div className="text-center pt-8 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            SV Tour & Travels • Professional Travel Partners • Secure Checkout
          </p>
        </div>
      </div>
    </main>
  );
}
