"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Send, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentSectionProps {
  paymentType: "enquiry" | "advance" | "full";
  setPaymentType: (type: "enquiry" | "advance" | "full") => void;
  totalAmount: number;
}

export default function PaymentSection({ paymentType, setPaymentType, totalAmount }: PaymentSectionProps) {
  const advanceAmount = Math.round(totalAmount * 0.3);
  const remainingAmount = totalAmount - advanceAmount;

  const options = [
    { 
      id: "enquiry", 
      title: "Send Enquiry Only", 
      subtitle: "No payment required", 
      icon: Send,
      badge: "Free"
    },
    { 
      id: "advance", 
      title: "Pay Advance (30%)", 
      subtitle: `Pay ₹${advanceAmount.toLocaleString()} to block`, 
      icon: CreditCard,
      badge: "Fastest"
    },
    { 
      id: "full", 
      title: "Pay Full Amount", 
      subtitle: `Complete ₹${totalAmount.toLocaleString()} now`, 
      icon: ShieldCheck,
      badge: "Secure"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/50 border border-gray-100 rounded-[2.5rem] p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-black text-gray-900 mb-2">Optional Online Booking</h3>
          <p className="text-sm text-gray-500 font-medium">You can either send an enquiry directly or pay online to confirm faster.</p>
        </div>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = paymentType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPaymentType(opt.id as any)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all group",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-transparent bg-white hover:border-gray-200"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  )}>
                    <opt.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className={cn("font-black text-sm", isSelected ? "text-primary" : "text-gray-900")}>
                      {opt.title}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
                      {opt.subtitle}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    <CheckCircle2 size={14} />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Payment Details */}
        {paymentType !== "enquiry" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 pt-6 border-t border-gray-200 space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Tour Price</span>
                <span className="text-lg font-black text-gray-900">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              {paymentType === "advance" && (
                <div className="space-y-3 pt-3 border-t border-gray-50">
                  <div className="flex justify-between items-center text-primary">
                    <span className="text-[10px] font-black uppercase tracking-widest">Payable Now (30%)</span>
                    <span className="text-2xl font-black">₹{advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Remaining Balance</span>
                    <span className="text-sm font-bold">₹{remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {paymentType === "full" && (
                <div className="flex justify-between items-center text-primary pt-3 border-t border-gray-50">
                  <span className="text-[10px] font-black uppercase tracking-widest">Payable Now</span>
                  <span className="text-2xl font-black">₹{totalAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest justify-center">
              <ShieldCheck size={12} className="text-green-500" />
              <span>Secure Payment powered by Razorpay</span>
            </div>
          </motion.div>
        )}

        <div className="mt-4 flex items-center space-x-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
          <Info size={14} className="text-blue-500 flex-shrink-0" />
          <p className="text-[10px] font-bold text-blue-600 leading-tight">
            Note: Online payment is completely optional. You can also send a query and our team will contact you.
          </p>
        </div>
      </div>
    </div>
  );
}
