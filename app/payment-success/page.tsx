"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, Download, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/lib/SettingsContext";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");
  const { settings } = useSettings();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-gray-200 border border-gray-100 space-y-8"
    >
      <div className="relative">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 -z-10 animate-pulse" />
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-black text-gray-900 leading-tight">Payment <span className="text-green-500">Successful!</span></h1>
        <p className="text-gray-500 font-medium">Your booking has been confirmed. We've sent the details to your WhatsApp.</p>
      </div>

      <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
          <span>Transaction ID</span>
          <span className="text-gray-900">{paymentId || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-4">
          <span>Booking Status</span>
          <span className="text-green-600">Confirmed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <Link 
          href="/"
          className="flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-gray-800 transition-all shadow-lg"
        >
          <Home size={18} />
          <span>Go to Home</span>
        </Link>
        <a 
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          className="flex items-center justify-center space-x-2 bg-green-500 text-white py-4 rounded-2xl font-black hover:bg-green-600 transition-all shadow-lg"
        >
          <MessageCircle size={18} />
          <span>Contact Support</span>
        </a>
      </div>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
        SV Tour & Travels • Professional Travel Partners
      </p>
    </motion.div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32 pb-24">
      <Suspense fallback={
        <div className="max-w-xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-gray-200 border border-gray-100">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-8 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-2xl mb-4 w-3/4 mx-auto" />
          <div className="h-6 bg-gray-200 rounded-xl mb-8 w-1/2 mx-auto" />
          <div className="bg-gray-100 rounded-3xl p-6 space-y-4 mb-8">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-14 bg-gray-200 rounded-2xl" />
            <div className="h-14 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </main>
  );
}
