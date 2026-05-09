"use client";

import { useState } from "react";
import { 
  X, 
  Save, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  CreditCard,
  ShieldCheck,
  Car
} from "lucide-react";
import toast from "react-hot-toast";

interface PaymentFormProps {
  initialData?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentForm({ initialData, onClose, onSuccess }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || "",
    phone: initialData?.phone || "",
    tourName: initialData?.tourName || "",
    vehicleName: initialData?.vehicleName || "",
    travelDate: initialData?.travelDate || "",
    paymentType: initialData?.paymentType || "enquiry",
    totalAmount: initialData?.totalAmount || 0,
    paidAmount: initialData?.paidAmount || 0,
    remainingAmount: initialData?.remainingAmount || 0,
    paymentStatus: initialData?.paymentStatus || "pending",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/payments/${initialData._id}` : "/api/payments";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEdit ? "Payment record updated successfully ✅" : "Payment record added successfully ✅");
        onSuccess();
        onClose();
      } else {
        throw new Error("Failed to save payment");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{isEdit ? "Edit Payment Record" : "Add Manual Payment"}</h2>
            <p className="text-gray-500 text-sm font-medium">Fill in the customer payment details below</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Trip Info */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tour Name</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.tourName}
                  onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Name</label>
              <div className="relative group">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.vehicleName}
                  onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Travel Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                <input
                  required
                  type="text"
                  placeholder="YYYY-MM-DD"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Type</label>
              <select
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none"
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as any })}
              >
                <option value="enquiry">Enquiry Only</option>
                <option value="advance">Advance Payment</option>
                <option value="full">Full Payment</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Amount (₹)</label>
              <input
                required
                type="number"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                value={formData.totalAmount}
                onChange={(e) => {
                  const total = Number(e.target.value);
                  setFormData({ ...formData, totalAmount: total, remainingAmount: total - formData.paidAmount });
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paid Amount (₹)</label>
              <input
                required
                type="number"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                value={formData.paidAmount}
                onChange={(e) => {
                  const paid = Number(e.target.value);
                  setFormData({ ...formData, paidAmount: paid, remainingAmount: formData.totalAmount - paid });
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Balance (₹)</label>
              <input
                disabled
                type="number"
                className="w-full bg-gray-100 border-2 border-transparent rounded-2xl py-4 px-6 font-bold text-gray-400"
                value={formData.remainingAmount}
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Status</label>
            <div className="flex flex-wrap gap-3">
              {["success", "pending", "failed"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentStatus: status as any })}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${
                    formData.paymentStatus === status 
                      ? status === 'success' ? 'bg-green-50 border-green-500 text-green-700' 
                        : status === 'failed' ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-amber-50 border-amber-500 text-amber-700'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-black text-sm hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-8 py-4 rounded-2xl bg-primary text-white font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={18} /><span>{isEdit ? "Update Record" : "Save Record"}</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}
