"use client";

import { useState } from "react";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Car, 
  Users, 
  Wind, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Star,
  ExternalLink,
  RotateCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

interface VehicleTableProps {
  vehicles: any[];
  onDelete: (id: string) => void;
}

export default function VehicleTable({ vehicles, onDelete }: VehicleTableProps) {
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
      const res = await fetch(`/api/vehicles/${idToDelete}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Vehicle deleted successfully ✅");
        onDelete(idToDelete);
      } else {
        throw new Error(data.error || "Failed to delete");
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting vehicle ❌");
    } finally {
      setDeletingId(null);
      setShowConfirm(false);
      setIdToDelete(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all"
          >
            {/* Image Preview */}
            <div className="relative aspect-video overflow-hidden">
              <SafeImage src={vehicle.thumbnail} alt={vehicle.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg ${
                  vehicle.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${vehicle.status === 'active' ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
                  {vehicle.status}
                </span>
                {vehicle.isPopular && (
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                    <Star size={10} className="fill-white" />
                    Popular
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{vehicle.type}</p>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{vehicle.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Per Day</p>
                  <p className="text-lg font-black text-gray-900">₹{(vehicle.pricePerDay || 0).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-gray-50">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-600">{vehicle.seats} Seats</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind size={16} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-600">{vehicle.airConditioned ? "AC" : "Non-AC"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCw size={16} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-600">{vehicle.frames360?.length || 0} Frames</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link 
                  href={`/admin/vehicles/edit/${vehicle._id}`}
                  className="flex-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-primary px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteClick(vehicle._id)}
                  disabled={deletingId === vehicle._id}
                  className="w-12 h-12 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {deletingId === vehicle._id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={!!deletingId}
        title="Delete Vehicle?"
        message="Are you sure you want to delete this vehicle? This action will hide it from the website."
      />
    </div>
  );
}
