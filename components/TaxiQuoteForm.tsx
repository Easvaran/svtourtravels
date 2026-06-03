"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, Phone, Calendar, Clock, Car, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

import SafeImage from "./SafeImage";

declare global {
  interface Window {
    google: any;
  }
}

const TaxiQuoteForm = ({ className = "" }: { className?: string }) => {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    pickupCity: "",
    dropCity: "",
    name: "",
    phone: "",
    date: "",
    time: "",
    vehicleId: "",
    returnDate: "",
  });
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details & Vehicle, 2: Summary, 3: Success
  const [bookingId, setBookingId] = useState("");

  const resetForm = () => {
    setFormData({
      pickupCity: "",
      dropCity: "",
      name: "",
      phone: "",
      date: "",
      time: "",
      vehicleId: "",
      returnDate: "",
    });
    setStep(1);
    setIsSubmitted(false);
    // Generate a new booking ID for the next booking
    setBookingId("BDTO" + Math.floor(1000 + Math.random() * 9000));
  };

  useEffect(() => {
    // Generate a random booking ID like BDTO2990
    const randomId = "BDTO" + Math.floor(1000 + Math.random() * 9000);
    setBookingId(randomId);
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [distance, setDistance] = useState<number>(158); // Default distance
  const [isCalculating, setIsCalculating] = useState(false);

  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);

  // Load Google Maps script
  useEffect(() => {
    if (typeof window === 'undefined' || window.google) return;
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize Autocomplete and Distance Matrix
  useEffect(() => {
    if (typeof window === 'undefined' || !window.google || !pickupInputRef.current || !dropInputRef.current) return;

    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current);
    const dropAutocomplete = new window.google.maps.places.Autocomplete(dropInputRef.current);

    const calculateDistance = () => {
      const origin = pickupInputRef.current?.value;
      const destination = dropInputRef.current?.value;

      if (origin && destination) {
        setIsCalculating(true);
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response: any, status: string) => {
            if (status === "OK") {
              const distanceInMeters = response.rows[0].elements[0].distance.value;
              const distanceInKm = distanceInMeters / 1000;
              // Minimum distance is 130km as per client requirement
              setDistance(Math.max(130, Math.ceil(distanceInKm)));
            }
            setIsCalculating(false);
          }
        );

        setFormData(prev => ({
          ...prev,
          pickupCity: origin || "",
          dropCity: destination || ""
        }));
      }
    };

    pickupAutocomplete.addListener("place_changed", () => {
      const place = pickupAutocomplete.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, pickupCity: place.formatted_address }));
        calculateDistance();
      }
    });

    dropAutocomplete.addListener("place_changed", () => {
      const place = dropAutocomplete.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, dropCity: place.formatted_address }));
        calculateDistance();
      }
    });
  }, []);

  useEffect(() => {
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        const activeVehicles = data.filter((v: any) => v.status === "active");
        setVehicles(activeVehicles);
      })
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  // Effect to handle URL changes (pre-selecting vehicle)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const preSelectedId = params.get("vehicleId");
      if (preSelectedId && vehicles.some((v: any) => v._id === preSelectedId)) {
        setFormData(prev => ({ ...prev, vehicleId: preSelectedId }));
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [vehicles]); // Re-run when vehicles are loaded or URL changes

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.pickupCity) newErrors.pickupCity = "Pickup location is required";
    if (!formData.dropCity) newErrors.dropCity = "Drop location is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Please enter phone number";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (tripType === "round-trip" && !formData.returnDate) newErrors.returnDate = "Return date is required";
    if (!formData.vehicleId) newErrors.vehicleId = "Please fill the details above first";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleVehicleSelect = (id: string) => {
    if (formData.vehicleId === id) {
      // If clicking the already selected vehicle, show all vehicles again
      setFormData(prev => ({ ...prev, vehicleId: "" }));
    } else {
      // Select the vehicle
      setFormData(prev => ({ ...prev, vehicleId: id }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setIsSubmitted(true);
      if (!validate()) return;
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const selectedVehicle = vehicles.find(v => v._id === formData.vehicleId);
      const distanceCharge = Math.round(distance * (selectedVehicle?.oneWayPrice || 0));
      const driverBeta = selectedVehicle?.oneWayBeta || 400;
      const totalAmount = distanceCharge + driverBeta;

      const submissionData = {
        ...formData,
        tripType,
        vehicleName: selectedVehicle?.name || "",
        destination: `Taxi from ${formData.pickupCity} to ${formData.dropCity}`,
        travelDate: formData.date,
        totalAmount,
        distance,
        packageType: "taxi",
        message: `Trip Type: ${tripType}, Time: ${formData.time}${tripType === "round-trip" ? `, Return Date: ${formData.returnDate}` : ""}`,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Booking Confirmed Successfully! ✅");
        
        const msg = `
*🚕 SV TOUR & TRAVELS - BOOKING CONFIRMATION*
----------------------------------------
🆔 *Booking ID:* ${bookingId}
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📍 *Pickup:* ${formData.pickupCity}
🏁 *Drop:* ${formData.dropCity}
🚗 *Vehicle:* ${selectedVehicle?.name}
📅 *Date:* ${formData.date}
⏰ *Time:* ${formData.time}
🛣️ *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}

*PAYMENT DETAILS:*
----------------------------------------
💰 *Distance Charge:* ₹${distanceCharge} (${distance} Km)
💵 *Rate Per Km:* ₹${selectedVehicle?.oneWayPrice || 0}
👨‍✈️ *Driver Beta:* ₹${driverBeta}
✅ *TOTAL AMOUNT:* ₹${totalAmount}

_Note: Toll, Permit, Parking & Waiting charges are extra._
----------------------------------------
        `;
        const WHATSAPP_NUMBER = "918668076871";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg.trim())}`, "_blank");
        
        setStep(3);
      } else {
        throw new Error(data.message || "Failed to submit request");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (name: string) => cn(
    "w-full bg-white border-2 rounded-xl h-12 pl-10 pr-4 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm font-bold",
    errors[name] ? "border-red-400 bg-red-50/30" : "border-[#10b981] focus:border-[#059669] focus:ring-0"
  );
  
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1";
  const errorTextClasses = "text-[10px] text-red-500 mt-1 ml-1 font-medium flex items-center gap-1";

  return (
    <div className={cn("bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-visible", className)}>
      {/* Heading - Explicitly ensured visibility */}
      <div className="p-5 border-b border-gray-100 bg-white rounded-t-2xl">
        <h3 className="text-center font-black text-gray-900 text-xl uppercase tracking-tight">
          Get Instant Quote
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
        {step === 1 ? (
          <>
            {/* Trip Type Tabs */}
            <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-4 border-2 border-gray-100">
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={cn(
                  "flex-1 py-3.5 rounded-xl text-sm font-black transition-all uppercase tracking-tight",
                  tripType === "one-way" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/20" : "text-gray-500 hover:text-gray-700"
                )}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={cn(
                  "flex-1 py-3.5 rounded-xl text-sm font-black transition-all uppercase tracking-tight",
                  tripType === "round-trip" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/20" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Round Trip
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelClasses}>Pickup City</label>
                <div className="relative">
                  <MapPin size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.pickupCity ? "text-red-400" : "text-gray-400")} />
                  <input
                    ref={pickupInputRef}
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    placeholder="Pickup City"
                    className={inputClasses("pickupCity")}
                  />
                </div>
                {errors.pickupCity && <span className={errorTextClasses}>{errors.pickupCity}</span>}
              </div>
              <div className="relative">
                <label className={labelClasses}>Drop City</label>
                <div className="relative">
                  <MapPin size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.dropCity ? "text-red-400" : "text-gray-400")} />
                  <input
                    ref={dropInputRef}
                    name="dropCity"
                    value={formData.dropCity}
                    onChange={handleChange}
                    placeholder="Drop City"
                    className={inputClasses("dropCity")}
                  />
                </div>
                {errors.dropCity && <span className={errorTextClasses}>{errors.dropCity}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.date ? "text-red-400" : "text-gray-400")} />
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClasses("date")}
                  />
                  {errors.date && <span className={errorTextClasses}>{errors.date}</span>}
                </div>
                <div className="relative">
                  <Clock size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.time ? "text-red-400" : "text-gray-400")} />
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={inputClasses("time")}
                  />
                  {errors.time && <span className={errorTextClasses}>{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Return Date Field - Only for Round Trip */}
            <AnimatePresence initial={false}>
              {tripType === "round-trip" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <label className={labelClasses}>Return Date</label>
                    <div className="relative">
                      <Calendar size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2", errors.returnDate ? "text-red-400" : "text-gray-400")} />
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className={inputClasses("returnDate")}
                      />
                    </div>
                    {errors.returnDate && <span className={errorTextClasses}>{errors.returnDate}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[12px] font-black text-gray-900 uppercase tracking-tight">Select Vehicle</label>
                {formData.vehicleId && (
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, vehicleId: "" }))}
                    className="text-[10px] font-black text-[#0870b8] uppercase tracking-widest hover:underline"
                  >
                    Change Vehicle
                  </button>
                )}
              </div>
              <div className={cn(
                "space-y-3 pr-1 custom-scrollbar bg-gray-50/50 p-3 rounded-2xl border-2 border-gray-100 transition-all duration-500",
                formData.vehicleId ? "max-h-[100px]" : "max-h-[320px] overflow-y-auto"
              )}>
                {vehicles.length > 0 ? (
                  vehicles
                    .filter(v => !formData.vehicleId || v._id === formData.vehicleId)
                    .map((v) => (
                    <button
                      key={v._id}
                  type="button"
                  onClick={() => handleVehicleSelect(v._id)}
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
                            src={v.thumbnail || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"}
                            alt={v.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-black text-gray-900 text-sm leading-tight">{v.name}</p>
                          <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-50 text-[8px] font-black text-blue-600 uppercase tracking-widest mt-1 border border-blue-100">
                            {distance} KM Billable
                          </div>
                        </div>
                      </div>

                      <div className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative z-10 shadow-sm",
                        formData.vehicleId === v._id 
                          ? "bg-[#10b981] text-white" 
                          : "bg-[#0870b8] text-white hover:bg-[#065a94]"
                      )}>
                        ₹{(Math.round(distance * (v.oneWayPrice || 0)) + (v.oneWayBeta || 400)).toLocaleString()}
                      </div>
                      
                      {formData.vehicleId === v._id && (
                        <motion.div 
                          layoutId="selected-bg"
                          className="absolute inset-0 bg-emerald-50/30 -z-0"
                        />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                    No vehicles available
                  </div>
                )}
              </div>
              {errors.vehicleId && <span className={errorTextClasses}>{errors.vehicleId}</span>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Next: Summary</span>
              )}
            </button>
          </>
        ) : step === 2 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 space-y-6">
              <h4 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3">Booking Summary</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-xs font-medium">
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Booking Id</p>
                  <p className="text-gray-900 font-black">{bookingId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Book Type</p>
                  <p className="text-gray-900 font-black">{tripType === "one-way" ? "One Way" : "Round Trip"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Name</p>
                  <p className="text-gray-900 font-black">{formData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Phone</p>
                  <p className="text-gray-900 font-black">{formData.phone}</p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Pickup</p>
                  <p className="text-gray-900 font-black leading-relaxed">{formData.pickupCity}</p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Drop</p>
                  <p className="text-gray-900 font-black leading-relaxed">{formData.dropCity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Car Type</p>
                  <p className="text-gray-900 font-black">{vehicles.find(v => v._id === formData.vehicleId)?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Booking At</p>
                  <p className="text-gray-900 font-black">{formData.date} at {formData.time}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h5 className="text-sm font-black text-gray-900 mb-4">Payment Details</h5>
                <div className="border border-gray-100 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-[11px] min-w-[300px]">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2 text-center">Details</th>
                        <th className="px-4 py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-bold text-gray-700">
                      <tr>
                        <td className="px-4 py-3">Distance Charge</td>
                        <td className="px-4 py-3 text-center">{distance} Km</td>
                        <td className="px-4 py-3 text-right">₹{Math.round(distance * (vehicles.find(v => v._id === formData.vehicleId)?.oneWayPrice || 0))}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Rate Per Km</td>
                        <td className="px-4 py-3 text-center">₹{vehicles.find(v => v._id === formData.vehicleId)?.oneWayPrice || 0}</td>
                        <td className="px-4 py-3 text-right">—</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Driver Beta</td>
                        <td className="px-4 py-3 text-center">Flat</td>
                        <td className="px-4 py-3 text-right">₹{vehicles.find(v => v._id === formData.vehicleId)?.oneWayBeta || 400}</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50/50">
                      <tr className="text-sm font-black text-gray-900">
                        <td colSpan={2} className="px-4 py-4 uppercase tracking-widest">Total Amount</td>
                        <td className="px-4 py-4 text-right">₹{Math.round(distance * (vehicles.find(v => v._id === formData.vehicleId)?.oneWayPrice || 0)) + (vehicles.find(v => v._id === formData.vehicleId)?.oneWayBeta || 400)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-100 text-gray-500 font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-[2] bg-[#10b981] hover:bg-[#059669] text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                </button>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl space-y-2">
                <p className="text-[10px] font-medium text-yellow-800 leading-relaxed">
                  <span className="font-black uppercase tracking-widest mr-1">Note:</span> 
                  Toll Gate, State Permit, Hill Station, Parking, Waiting Time - Charges Extra.
                </p>
                <p className="text-[10px] font-black text-yellow-900 italic">
                  *Minimum billing distance is 130 km.*
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50/50 border-2 border-[#10b981] rounded-[2rem] p-8 space-y-6"
          >
            <div className="flex items-center gap-3 text-[#10b981] mb-6">
              <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <AlertCircle size={24} className="rotate-180" />
                </motion.div>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight">Booking Successful!</h4>
            </div>

            <div className="space-y-4 text-sm font-medium text-gray-700">
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Booking Id</span>
                <span className="font-black text-gray-900">{bookingId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Trip Type</span>
                <span className="font-black text-gray-900">{tripType === "one-way" ? "One Way" : "Round Trip"}</span>
              </div>
              <div className="flex flex-col gap-1 py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Pickup</span>
                <span className="font-black text-gray-900 leading-tight">{formData.pickupCity}</span>
              </div>
              <div className="flex flex-col gap-1 py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Drop</span>
                <span className="font-black text-gray-900 leading-tight">{formData.dropCity}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Phone</span>
                <span className="font-black text-gray-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Name</span>
                <span className="font-black text-gray-900">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Pickup Date</span>
                <span className="font-black text-gray-900">{formData.date}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Pickup Time</span>
                <span className="font-black text-gray-900">{formData.time}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Vehicle</span>
                <span className="font-black text-gray-900">{vehicles.find(v => v._id === formData.vehicleId)?.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-emerald-100/50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Billable Distance</span>
                <span className="font-black text-gray-900">{distance} Km</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[#10b981] font-black uppercase tracking-widest text-[12px]">Estimated Fare</span>
                <span className="text-xl font-black text-[#10b981]">
                  ₹{Math.round(distance * (vehicles.find(v => v._id === formData.vehicleId)?.oneWayPrice || 0)) + (vehicles.find(v => v._id === formData.vehicleId)?.oneWayBeta || 400)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-full mt-6 bg-[#10b981] hover:bg-[#059669] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Back To Home
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default TaxiQuoteForm;
