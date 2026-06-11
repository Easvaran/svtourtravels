"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Navigation,
  MapPin,
  Clock,
  Navigation2,
  Star,
  Eye
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import SafeImage from "@/components/SafeImage";

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      setTours(data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
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
    
    setDeletingId(idToDelete);
    try {
      const res = await fetch(`/api/tours/${idToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Tour deleted successfully");
        setTours(tours.filter(t => t._id !== idToDelete));
        setShowConfirm(false);
      } else {
        toast.error("Failed to delete tour");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeletingId(null);
      setIdToDelete(null);
    }
  };

  const filteredTours = Array.isArray(tours) ? tours.filter(t => 
    t.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.to.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Manage One-Way Tours</h1>
          <p className="text-gray-500 font-medium">Configure popular destinations and fixed pricing</p>
        </div>
        <Link 
          href="/admin/tours/add"
          className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-[#059669] transition-all shadow-lg shadow-[#10b981]/20 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Tour</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative group max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by origin or destination..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredTours.map((tour, index) => (
            <motion.div
              key={tour._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-[2.5rem] border ${tour.isPopular ? 'border-yellow-400 ring-2 ring-yellow-400 ring-opacity-20 shadow-xl' : 'border-gray-100 shadow-sm'} transition-all group overflow-hidden flex flex-col`}
            >
              {tour.image && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-gray-100">
                  <SafeImage src={tour.image} alt="Tour Preview" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1 relative">
                {tour.isPopular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-10">
                    <Star size={10} className="fill-current" />
                    Popular
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6 relative">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 bg-white" />
                    <div className="w-px h-8 border-r border-dashed border-gray-300" />
                    <Navigation2 size={14} className="text-[#10b981] rotate-180" />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="text-lg font-black text-gray-900">{tour.from}</span>
                    <span className="text-lg font-black text-gray-900">{tour.to}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</span>
                    <div className="flex items-center gap-1.5 text-[#10b981] font-bold text-sm">
                      <Navigation size={14} className="rotate-45" />
                      {tour.distance}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</span>
                    <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
                      <Clock size={14} />
                      {tour.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting from</span>
                    <span className="text-2xl font-black text-[#10b981]">₹{(tour.price || 0).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/tours/${tour._id}/edit`}
                      className="w-12 h-12 bg-gray-50 hover:bg-[#10b981] text-gray-700 hover:text-white rounded-xl transition-all flex items-center justify-center"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(tour._id)}
                      disabled={deletingId === tour._id}
                      className="w-12 h-12 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                    >
                      {deletingId === tour._id ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredTours.length === 0 && !loading && (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <MapPin className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-black text-gray-900">No tours found</h3>
          <p className="text-gray-500 font-medium mb-8">Start by adding your first popular destination.</p>
          <Link 
            href="/admin/tours/add"
            className="inline-flex items-center gap-2 bg-[#10b981] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#059669] transition-all shadow-lg shadow-[#10b981]/20"
          >
            <Plus size={20} />
            <span>Add Your First Tour</span>
          </Link>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={!!deletingId}
        title="Delete Tour Destination?"
        message="Are you sure you want to delete this destination? This action cannot be undone."
        confirmText="Delete Tour"
      />
    </div>
  );
}
