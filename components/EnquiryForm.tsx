"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, MapPin, Calendar, Users, IndianRupee, Clock, CheckCircle, Car } from "lucide-react";
import toast from "react-hot-toast";
import { useSettings } from "@/lib/SettingsContext";
import BookingInput from "./booking/BookingInput";
import PriceCard from "./booking/PriceCard";
import PaymentSection from "./booking/PaymentSection";
import { useRouter } from "next/navigation";
import Script from "next/script";

const EnquiryForm = ({ 
  className = "", 
  showTitle = true,
  initialPrice = 0,
  tourTitle = "",
  selectedVehicle = null
}: { 
  className?: string; 
  showTitle?: boolean;
  initialPrice?: number | string;
  tourTitle?: string;
  selectedVehicle?: any;
}) => {
  const { settings } = useSettings();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentType, setPaymentType] = useState<"enquiry" | "advance" | "full">("enquiry");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: tourTitle || "",
    travelDate: "",
    days: "",
    people: "1",
    packageType: "Family",
    message: "",
    vehicleId: "",
  });

  const [internalSelectedVehicle, setInternalSelectedVehicle] = useState<any>(selectedVehicle);

  useEffect(() => {
    setInternalSelectedVehicle(selectedVehicle);
    setFormData(prev => ({ ...prev, vehicleId: selectedVehicle ? (selectedVehicle._id || selectedVehicle.id || "") : "" }));
  }, [selectedVehicle]);

  useEffect(() => {
    // Fetch vehicles if not provided
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => {
        const activeVehicles = data.filter((v: any) => v.status === "active");
        setVehicles(activeVehicles);
      })
      .catch(err => console.error("Error fetching vehicles:", err));
  }, []);

  const currentVehicle = internalSelectedVehicle || vehicles.find(v => v._id === formData.vehicleId);

  const pricePerPerson = typeof initialPrice === 'string' 
    ? parseInt(initialPrice.replace(/[^0-9]/g, '')) 
    : (Number(initialPrice) || 0);

  const peopleCount = Number(formData.people) || 0;
  const daysCount = Number(formData.days) || 1;

  const tourAmount = pricePerPerson * peopleCount;
  const vehicleAmount = currentVehicle ? (Number(currentVehicle.pricePerDay || currentVehicle.price) * daysCount) : 0;
  const totalAmount = tourAmount + vehicleAmount;
  const WHATSAPP_NUMBER = "918668076871";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "vehicleId") {
      const vehicle = vehicles.find(v => v._id === value);
      setInternalSelectedVehicle(vehicle);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      destination: tourTitle || "",
      travelDate: "",
      days: "",
      people: "1",
      packageType: "Family",
      message: "",
      vehicleId: "",
    });
    setInternalSelectedVehicle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleId && !internalSelectedVehicle) {
      toast.error("Please select a vehicle first 🚗");
      return;
    }

    setLoading(true);

    try {
      const finalVehicle = internalSelectedVehicle || vehicles.find(v => v._id === formData.vehicleId);
      
      const submissionData = {
        ...formData,
        vehicleName: finalVehicle?.name || "",
        vehicleType: finalVehicle?.type || "",
        vehiclePrice: finalVehicle?.pricePerDay || finalVehicle?.price || 0,
        vehicleSeats: finalVehicle?.seats || 0,
        paymentType,
        totalAmount,
        paidAmount: paymentType === "full" ? totalAmount : paymentType === "advance" ? Math.round(totalAmount * 0.1) : 0,
        remainingAmount: paymentType === "full" ? 0 : paymentType === "advance" ? totalAmount - Math.round(totalAmount * 0.1) : totalAmount,
      };

      // If it's just an enquiry, use the normal flow
      if (paymentType === "enquiry") {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        const data = await res.json();

        if (data.success) {
          toast.success("Enquiry Sent Successfully ✅");
          setSubmitted(true);

          // ALSO save to new Payments collection for Admin CRUD as pending
          await fetch("/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerName: formData.name,
              phone: formData.phone,
              tourName: formData.destination,
              vehicleName: finalVehicle?.name || "",
              travelDate: formData.travelDate,
              paymentType: "enquiry",
              totalAmount: totalAmount,
              paidAmount: 0,
              remainingAmount: totalAmount,
              paymentStatus: "pending"
            }),
          });
          
          const msg = `
*New Trip Enquiry* 
-------------------
*Tour:* ${formData.destination}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.travelDate}
*Days:* ${formData.days}
*People:* ${formData.people}
${finalVehicle ? `
*Vehicle Details:*
- Vehicle: ${finalVehicle.name}
- Type: ${finalVehicle.type}
- Seats: ${finalVehicle.seats}
- Price: ₹${finalVehicle.pricePerDay || finalVehicle.price}/day
` : ""}
*Package:* ${formData.packageType}
*Message:* ${formData.message || "None"}
          `;
          const encodedMsg = encodeURIComponent(msg);
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`, "_blank");
          
          setTimeout(() => {
            setSubmitted(false);
            resetForm();
          }, 3000);
        } else {
          throw new Error(data.message || "Failed to submit enquiry ❌");
        }
      } else {
        // For Advance or Full payment, redirect to payment options page
        // We use sessionStorage for cleaner temporary data management
        sessionStorage.setItem("temp_booking", JSON.stringify(submissionData));
        router.push("/payment-options");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to process booking ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 max-w-[900px] mx-auto overflow-hidden ${className}`}
    >
      <div className="bg-gradient-to-r from-[#00bcd4] to-blue-600 py-8 px-10 text-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
        
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight relative z-10">Start Your Adventure</h2>
        <p className="text-white/80 font-medium text-sm relative z-10">Professional guidance for every mile of your trip</p>
      </div>

      <div className="p-8 md:p-10">
        {showTitle && (
          <div className="text-center mb-12 hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Get a Free Quote</h2>
            <div className="w-20 h-1.5 bg-[#00bcd4] mx-auto rounded-full mb-4" />
            <p className="text-gray-500 font-medium">Your dream vacation is just a few details away.</p>
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        
        {/* Vehicle Selection - Mandatory */}
        <div className="space-y-2">
          <BookingInput 
            label="Choose Vehicle (Compulsory)" 
            name="vehicleId" 
            value={formData.vehicleId || (internalSelectedVehicle?._id || "")} 
            onChange={handleChange} 
            type="select" 
            icon={Car} 
            options={[
              { value: "", label: "Select a Vehicle" },
              ...vehicles.map(v => ({ 
                value: v._id, 
                label: `${v.name} (${v.seats} Seats) - ₹${v.pricePerDay || v.price}/day` 
              }))
            ]}
          />
          {!formData.vehicleId && !internalSelectedVehicle && (
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-pulse">
              * Please select a vehicle to continue
            </p>
          )}
        </div>

        {/* Selected Vehicle Summary - Only show if selected and matches the ID */}
        {currentVehicle && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#00bcd4]/5 border border-[#00bcd4]/20 rounded-2xl p-6 flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00bcd4] shadow-sm border border-[#00bcd4]/10">
                <Car size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#00bcd4] uppercase tracking-widest mb-1">Selected Vehicle</p>
                <h4 className="text-lg font-bold text-gray-900">{currentVehicle.name}</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
              <p className="text-xl font-bold text-gray-900">₹{(currentVehicle.pricePerDay || currentVehicle.price).toLocaleString()}</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <BookingInput 
            label="Full Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            icon={User} 
            placeholder="John Doe" 
          />
          <BookingInput 
            label="Phone Number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            type="tel" 
            icon={Phone} 
            placeholder="+91 XXXXX XXXXX" 
          />
          <BookingInput 
            label="Destination" 
            name="destination" 
            value={formData.destination} 
            onChange={handleChange} 
            type="select" 
            icon={MapPin} 
            options={[
              { value: "", label: "Select Destination" },
              ...(tourTitle && !["Ooty", "Kodaikanal", "Kerala", "Himachal", "Goa"].includes(tourTitle) ? [{ value: tourTitle, label: tourTitle }] : []),
              { value: "Ooty", label: "Ooty" },
              { value: "Kodaikanal", label: "Kodaikanal" },
              { value: "Kerala", label: "Kerala" },
              { value: "Himachal", label: "Himachal" },
              { value: "Goa", label: "Goa" },
              { value: "Custom", label: "Other (Custom)" }
            ]}
          />
          <BookingInput 
            label="Travel Date" 
            name="travelDate" 
            value={formData.travelDate} 
            onChange={handleChange} 
            type="date" 
            icon={Calendar} 
          />
          <BookingInput 
            label="Travel Days" 
            name="days" 
            value={formData.days} 
            onChange={handleChange} 
            type="number" 
            min="1" 
            icon={Clock} 
            placeholder="Ex: 3" 
          />
          <BookingInput 
            label="Package Type" 
            name="packageType" 
            value={formData.packageType} 
            onChange={handleChange} 
            type="select" 
            icon={IndianRupee} 
            options={[
              { value: "Family", label: "Family Trip" },
              { value: "Honeymoon", label: "Honeymoon" },
              { value: "Group", label: "Group Tour" },
              { value: "Adventure", label: "Adventure" },
              { value: "Custom", label: "Custom Package" }
            ]}
          />
          <div className="md:col-span-2">
            <BookingInput 
              label="Number of People" 
              name="people" 
              value={formData.people} 
              onChange={handleChange} 
              type="number" 
              min="1" 
              icon={Users} 
              placeholder="Ex: 2" 
            />
          </div>
        </div>

        {pricePerPerson > 0 && (
          <PriceCard amount={totalAmount} people={formData.people} />
        )}

        {pricePerPerson > 0 && (
          <PaymentSection 
            paymentType={paymentType} 
            setPaymentType={setPaymentType} 
            totalAmount={totalAmount} 
          />
        )}

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
            Additional Requirements
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your preferences..."
            className="w-full bg-white border border-gray-200 rounded-xl p-5 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal resize-none shadow-sm"
          ></textarea>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full font-bold py-5 rounded-xl flex items-center justify-center space-x-3 transition-all hover:shadow-[0_20px_40px_rgba(0,188,212,0.25)] hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-lg px-6 ${
            submitted
              ? "bg-green-500 text-white"
              : "bg-[#00bcd4] text-white"
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className="flex items-center justify-center space-x-3">
              {submitted ? (
                <CheckCircle size={22} className="flex-shrink-0" />
              ) : (
                <Send size={22} className="flex-shrink-0" />
              )}
              <span className="leading-tight">
                {submitted 
                  ? "Done! WhatsApp Opened" 
                  : paymentType === "enquiry" 
                    ? "Send Enquiry & WhatsApp" 
                    : paymentType === "advance" 
                      ? `Pay Advance ₹${Math.round(totalAmount * 0.1).toLocaleString()} Now` 
                      : `Pay Full Amount ₹${totalAmount.toLocaleString()} Now`}
              </span>
            </div>
          )}
        </button>
      </form>
      </div>
    </motion.div>
  );
};

export default EnquiryForm;
