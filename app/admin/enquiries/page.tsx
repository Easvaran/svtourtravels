"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Clock, 
  Search, 
  Filter,
  Package,
  ChevronRight,
  Car,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiry");
      const data = await res.json();
      if (res.ok) {
        setEnquiries(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/enquiry/${idToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Enquiry deleted successfully ✅");
        fetchEnquiries();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting enquiry ❌");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setIdToDelete(null);
    }
  };

  const filteredEnquiries = enquiries.filter(enq => 
    enq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-48 bg-gray-200 rounded-xl" />
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Enquiries</h1>
          <p className="text-gray-500 font-medium">Manage and view all customer trip enquiries</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, destination or phone..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
            <Users className="mx-auto text-gray-200 mb-4" size={64} />
            <h3 className="text-xl font-black text-gray-900">No enquiries found</h3>
            <p className="text-gray-500 font-medium">When customers fill out the form, they will appear here.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredEnquiries.map((enq, i) => (
              <motion.div
                key={enq._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Users size={28} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-xl font-black text-gray-900">{enq.name}</h3>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
                          {enq.packageType}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                        <a href={`tel:${enq.phone}`} className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <Phone size={14} />
                          <span>{enq.phone}</span>
                        </a>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} className="text-primary" />
                          <span className="text-gray-900 font-bold">{enq.destination}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{enq.travelDate}</span>
                        </div>
                        {enq.time && (
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{enq.time}</span>
                          </div>
                        )}
                        {enq.packageType === "taxi" ? (
                          <>
                            <div className="flex items-center space-x-1">
                              <Car size={14} />
                              <span className="capitalize">{enq.tripType?.replace("-", " ") || "One Way"}</span>
                            </div>
                            {enq.returnDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} className="text-blue-500" />
                                <span>Return: {enq.returnDate}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{enq.days} Days</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users size={14} />
                              <span>{enq.people} Adults</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {enq.vehicleName && (
                        <div className="mt-4 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50 inline-flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                            <Car size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">Vehicle Selection</p>
                            <p className="text-xs font-black text-gray-900">
                              {enq.vehicleName} <span className="text-gray-400 font-medium">({enq.vehicleType})</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Payment Status Badges */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {enq.paymentType === "full" && (
                          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Fully Paid</span>
                            <span className="text-[10px] font-bold">₹{enq.paidAmount?.toLocaleString()}</span>
                          </div>
                        )}
                        {enq.paymentType === "advance" && (
                          <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm">
                            <CreditCard size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Advance Paid</span>
                            <span className="text-[10px] font-bold">₹{enq.paidAmount?.toLocaleString()}</span>
                          </div>
                        )}
                        {enq.paymentType === "enquiry" && (
                          <div className="flex items-center space-x-2 bg-gray-50 text-gray-500 px-3 py-1.5 rounded-xl border border-gray-100">
                            <AlertCircle size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Enquiry Only</span>
                            {enq.totalAmount > 0 && <span className="text-[10px] font-bold border-l border-gray-200 pl-2">Est. ₹{enq.totalAmount?.toLocaleString()}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 lg:pl-6 lg:border-l border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Message</span>
                      </div>
                      <p className="text-sm text-gray-600 italic line-clamp-2 max-w-md">
                        {enq.message ? `"${enq.message}"` : "No additional requirements provided."}
                      </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Received</p>
                      <p className="text-sm font-bold text-gray-900 mb-4">
                        {new Date(enq.createdAt).toLocaleDateString(undefined, { 
                          day: 'numeric', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleDeleteClick(enq._id)}
                          className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Delete Enquiry"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Enquiry?"
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
        confirmText="Delete Enquiry"
      />
    </div>
  );
}
