"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Script from "next/script";

interface PaymentButtonProps {
  booking: any;
}

export default function PaymentButton({ booking }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payableNow = booking.paymentType === "full" 
        ? booking.totalAmount 
        : Math.round(booking.totalAmount * 0.3);

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: payableNow }),
      });
      const orderData = await orderRes.json();

      if (!orderData.id) throw new Error("Failed to create Razorpay order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SV Tour & Travels",
        description: `Booking for ${booking.destination}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Save final booking to database
            const finalData = {
              ...booking,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              paymentStatus: booking.paymentType === "full" ? "fully_paid" : "partially_paid",
            };

            const res = await fetch("/api/enquiry", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalData),
            });

            // ALSO save to new Payments collection for Admin CRUD
            await fetch("/api/payments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerName: booking.name,
                phone: booking.phone,
                tourName: booking.destination,
                vehicleName: booking.vehicleName,
                travelDate: booking.travelDate,
                paymentType: booking.paymentType,
                totalAmount: booking.totalAmount,
                paidAmount: payableNow,
                remainingAmount: booking.totalAmount - payableNow,
                paymentStatus: "success",
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id
              }),
            });

            if (res.ok) {
              toast.success("Payment & Booking Successful ✅");
              sessionStorage.removeItem("temp_booking");
              router.push(`/payment-success?id=${response.razorpay_payment_id}`);
            } else {
              throw new Error("Failed to save booking details");
            }
          } else {
            router.push("/payment-failed");
          }
        },
        prefill: {
          name: booking.name,
          contact: booking.phone,
        },
        theme: { color: "#0870b8" },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error(response.error.description);
        router.push("/payment-failed");
      });
      rzp.open();
    } catch (error: any) {
      toast.error(error.message || "Payment initialization failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8">
        <div>
          <div className="flex items-center space-x-2 text-primary font-black tracking-[0.2em] uppercase text-[10px] mb-2">
            <CreditCard size={14} />
            <span>Secure Payment</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Pay & <span className="text-primary">Confirm</span></h2>
          <p className="text-gray-500 font-medium mt-2 text-sm leading-relaxed">
            Complete your payment securely via Razorpay. We support UPI, Cards, Net Banking, and Wallets.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-8 h-8" />
            <div>
              <p className="text-xs font-black text-gray-900">Razorpay Secure Checkout</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PCI-DSS Compliant</p>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-primary to-blue-700 text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-3 shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {loading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <>
              <span>Complete Payment Now</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>

        <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-4 grayscale opacity-40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center space-x-2">
            <ShieldCheck size={12} className="text-green-500" />
            <span>100% Secure SSL Encrypted Payment</span>
          </p>
        </div>
      </div>
    </div>
  );
}
