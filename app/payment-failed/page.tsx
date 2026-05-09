"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/lib/SettingsContext";

export default function PaymentFailedPage() {
  const { settings } = useSettings();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32 pb-24">
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
            className="w-24 h-24 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-500/20"
          >
            <XCircle size={48} />
          </motion.div>
          <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 -z-10 animate-pulse" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">Payment <span className="text-red-500">Failed</span></h1>
          <p className="text-gray-500 font-medium">Something went wrong while processing your payment. Don't worry, no money was deducted.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Link 
            href="/payment-options"
            className="flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-gray-800 transition-all shadow-lg"
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
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

        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </main>
  );
}
