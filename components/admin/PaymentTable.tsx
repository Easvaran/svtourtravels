"use client";

import { useState } from "react";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ExternalLink,
  MoreVertical,
  User,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

interface PaymentTableProps {
  payments: any[];
  onDelete: (id: string) => void;
  onEdit: (payment: any) => void;
}

export default function PaymentTable({ payments, onDelete, onEdit }: PaymentTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;
    
    setDeletingId(idToDelete);
    try {
      const res = await fetch(`/api/payments/${idToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Payment record deleted successfully ✅");
        onDelete(idToDelete);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting record ❌");
    } finally {
      setDeletingId(null);
      setShowConfirm(false);
      setIdToDelete(null);
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar -mx-4 px-4">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr className="text-left">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Trip Details</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Info</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {payments.map((payment, index) => (
              <motion.tr
                key={payment._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                {/* Customer */}
                <td className="px-6 py-6 rounded-l-[2rem]">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-black">
                      {payment.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 leading-none mb-1">{payment.customerName}</p>
                      <a href={`tel:${payment.phone}`} className="text-xs font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                        <Phone size={10} />
                        {payment.phone}
                      </a>
                    </div>
                  </div>
                </td>

                {/* Trip Details */}
                <td className="px-6 py-6">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {payment.tourName}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {payment.travelDate}</span>
                      <span className="flex items-center gap-1"><CreditCard size={12} /> {payment.paymentType}</span>
                    </div>
                  </div>
                </td>

                {/* Payment Info */}
                <td className="px-6 py-6">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-900">₹{payment.paidAmount?.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Balance: <span className="text-red-500">₹{payment.remainingAmount?.toLocaleString()}</span>
                    </p>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                    payment.paymentStatus === 'success' ? 'bg-green-50 text-green-600 border border-green-100' :
                    payment.paymentStatus === 'failed' ? 'bg-red-50 text-red-600 border border-red-100' :
                    'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      payment.paymentStatus === 'success' ? 'bg-green-500' :
                      payment.paymentStatus === 'failed' ? 'bg-red-500' :
                      'bg-amber-500 animate-pulse'
                    }`} />
                    {payment.paymentStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-6 rounded-r-[2rem] text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(payment)}
                      className="p-3 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-primary rounded-xl transition-all"
                      title="Edit Payment"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      disabled={deletingId === payment._id}
                      onClick={() => handleDeleteClick(payment._id)}
                      className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                      title="Delete Record"
                    >
                      {deletingId === payment._id ? <Clock className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={!!deletingId}
        title="Delete Payment?"
        message="Are you sure you want to delete this payment record? This action cannot be undone."
      />
    </div>
  );
}
