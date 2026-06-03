"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Car, 
  ChevronDown, 
  AlertCircle, 
  Loader2,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import SafeImage from "./SafeImage";

interface EnquiryFormProps {
  className?: string;
  tourTitle?: string;
}

const EnquiryForm = ({ className = "", tourTitle = "" }: EnquiryFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: Summary, 3: Success
  const [bookingId, setBookingId] = useState("");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: tourTitle || "",
    travelDate: "",
    time: "",
    returnDate: "",
    days: "",
    people: "1",
    packageType: "Family Trip",
    message: "",
    vehicleId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Generate a random booking ID like SVENQ-2990
    const randomId = "SVENQ-" + Math.floor(1000 + Math.random() * 9000);
    setBookingId(randomId);

    // Fetch vehicles
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        const activeVehicles = data.filter((v: any) => v.status === "active");
        setVehicles(activeVehicles);
      })
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.destination) newErrors.destination = "Destination is required";
    if (!formData.travelDate) newErrors.travelDate = "Travel date is required";
    if (!formData.days) newErrors.days = "Please enter travel days";
    if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!validate()) {
        toast.error("Please fill all compulsory fields");
        return;
      }
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const selectedVehicle = vehicles.find(v => v._id === formData.vehicleId);
      const submissionData = {
        ...formData,
        tripType,
        vehicleName: selectedVehicle?.name || "",
        totalAmount: 0, // Calculated later if needed
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Enquiry Sent Successfully! ✅");
        
        const msg = `
*🌟 SV TOUR & TRAVELS - TOUR ENQUIRY*
----------------------------------------
🆔 *Enquiry ID:* ${bookingId}
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📍 *Destination:* ${formData.destination}
📅 *Travel Date:* ${formData.travelDate}
⏱️ *Duration:* ${formData.days} Days
👥 *People:* ${formData.people}
🎁 *Package:* ${formData.packageType}
🚗 *Vehicle:* ${selectedVehicle?.name}

*REQUIREMENTS:*
----------------------------------------
${formData.message || "None provided"}

----------------------------------------
_Thank you for choosing SV Tour & Travels!_
        `;
        const WHATSAPP_NUMBER = "918668076871";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg.trim())}`, "_blank");
        
        setStep(3);
      } else {
        throw new Error(data.message || "Failed to submit enquiry");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      destination: tourTitle || "",
      travelDate: "",
      time: "",
      returnDate: "",
      days: "",
      people: "1",
      packageType: "Family Trip",
      message: "",
      vehicleId: "",
    });
    setStep(1);
    setBookingId("SVENQ-" + Math.floor(1000 + Math.random() * 9000));
  };

  const inputClasses = (name: string) => cn(
    "w-full bg-white border-2 rounded-xl h-12 pl-10 pr-4 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm font-bold",
    errors[name] ? "border-red-400 bg-red-50/30" : "border-[#10b981] focus:border-[#059669] focus:ring-0"
  );
  
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1";
  const errorTextClasses = "text-[10px] text-red-500 mt-1 ml-1 font-medium";

  return (
    <div className={cn("bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl mx-auto overflow-hidden border border-gray-100", className)}>
      {/* Header - Matching Image 2 (Get Instant Quote Style) */}
      <div className="p-6 border-b border-gray-100 bg-white rounded-t-[2.5rem]">
        <h3 className="text-center font-black text-gray-900 text-2xl uppercase tracking-tight">
          Get Instant Quote
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
        {step === 1 ? (
          <>
            {/* Trip Type Tabs - Matching Image 2 */}
            <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-2 border-2 border-gray-100">
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={cn(
                  "flex-1 py-4 rounded-xl text-sm font-black transition-all uppercase tracking-tight",
                  tripType === "one-way" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/20" : "text-gray-400 hover:text-gray-600"
                )}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={cn(
                  "flex-1 py-4 rounded-xl text-sm font-black transition-all uppercase tracking-tight",
                  tripType === "round-trip" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/20" : "text-gray-400 hover:text-gray-600"
                )}
              >
                Round Trip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelClasses}>Pickup City</label>
                <div className="relative">
                  <MapPin size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.destination ? "text-red-400" : "text-gray-400")} />
                  <input
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Pickup City"
                    className={inputClasses("destination")}
                  />
                </div>
                {errors.destination && <span className={errorTextClasses}>{errors.destination}</span>}
              </div>
              <div className="relative">
                <label className={labelClasses}>Drop City</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="dropCity"
                    placeholder="Drop City"
                    className={inputClasses("dropCity")}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelClasses}>Your Name</label>
                <div className="relative">
                  <User size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.name ? "text-red-400" : "text-gray-400")} />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={inputClasses("name")}
                  />
                </div>
                {errors.name && <span className={errorTextClasses}>{errors.name}</span>}
              </div>
              <div className="relative">
                <label className={labelClasses}>Phone Number</label>
                <div className="relative">
                  <Phone size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.phone ? "text-red-400" : "text-gray-400")} />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={inputClasses("phone")}
                  />
                </div>
                {errors.phone && <span className={errorTextClasses}>{errors.phone}</span>}
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>Pickup Details</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Calendar size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.travelDate ? "text-red-400" : "text-gray-400")} />
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className={inputClasses("travelDate")}
                  />
                </div>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={inputClasses("time")}
                  />
                </div>
              </div>
              {errors.travelDate && <span className={errorTextClasses}>{errors.travelDate}</span>}
            </div>

            <AnimatePresence>
              {tripType === "round-trip" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="relative overflow-hidden"
                >
                  <label className={labelClasses}>Return Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className={inputClasses("returnDate")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vehicle Selection - Matching Image 2 */}
            <div className="relative">
              <label className="block text-[12px] font-black text-gray-900 uppercase tracking-tight mb-2 ml-1">Select Vehicle</label>
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar bg-gray-50/50 p-4 rounded-2xl border-2 border-gray-100">
                {vehicles.length > 0 ? (
                  vehicles.map((v) => (
                    <button
                      key={v._id}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, vehicleId: v._id }));
                        if (errors.vehicleId) setErrors(prev => ({ ...prev, vehicleId: "" }));
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 group relative overflow-hidden",
                        formData.vehicleId === v._id 
                          ? "bg-white border-[#10b981] shadow-lg shadow-[#10b981]/10" 
                          : "bg-white border-transparent hover:border-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                          <SafeImage
                            src={v.thumbnail || v.image}
                            alt={v.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-black text-gray-900 text-sm leading-tight">{v.name}</p>
                          <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-50 text-[8px] font-black text-blue-600 uppercase tracking-widest mt-1 border border-blue-100">
                            130 KM Billable
                          </div>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative z-10 shadow-sm",
                        formData.vehicleId === v._id 
                          ? "bg-[#10b981] text-white" 
                          : "bg-[#0870b8] text-white hover:bg-[#065a94]"
                      )}>
                        View Price
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    No vehicles available
                  </div>
                )}
              </div>
              {errors.vehicleId && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1 animate-pulse">* {errors.vehicleId}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm mt-4"
            >
              <span>Next: Summary</span>
              <ArrowRight size={20} />
            </button>
          </>
        ) : step === 2 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 space-y-6">
              <h4 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">Enquiry Summary</h4>
              
              <div className="grid grid-cols-2 gap-y-6 text-xs">
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Full Name</p>
                  <p className="text-gray-900 font-black text-sm">{formData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Phone Number</p>
                  <p className="text-gray-900 font-black text-sm">{formData.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Destination</p>
                  <p className="text-gray-900 font-black text-sm">{formData.destination}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Travel Date</p>
                  <p className="text-gray-900 font-black text-sm">{formData.travelDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Duration</p>
                  <p className="text-gray-900 font-black text-sm">{formData.days} Days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">People</p>
                  <p className="text-gray-900 font-black text-sm">{formData.people} Persons</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Package</p>
                  <p className="text-gray-900 font-black text-sm">{formData.packageType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Vehicle</p>
                  <p className="text-gray-900 font-black text-sm">{vehicles.find(v => v._id === formData.vehicleId)?.name}</p>
                </div>
              </div>

              {formData.message && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-2">Requirements</p>
                  <p className="text-gray-700 font-medium text-xs leading-relaxed italic">"{formData.message}"</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-[2] bg-[#00bcd4] hover:bg-[#0097a7] text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-[#00bcd4]/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : (
                    <>
                      <Send size={18} />
                      <span>Send Enquiry & WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50/50 border-2 border-[#10b981] rounded-[2rem] p-10 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-[#10b981] text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#10b981]/20">
              <CheckCircle2 size={40} />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Success!</h4>
              <p className="text-gray-500 font-medium text-sm">
                Your enquiry has been sent. We will contact you shortly via WhatsApp or Phone.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enquiry ID</span>
                <span className="text-[10px] font-black text-gray-900">{bookingId}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              Back To Form
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default EnquiryForm;
