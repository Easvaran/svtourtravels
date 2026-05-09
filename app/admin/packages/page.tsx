"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  Star,
  Clock,
  Package as PackageIcon,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function ManagePackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      if (res.ok) {
        setPackages(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error("Failed to fetch packages");
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
      const res = await fetch(`/api/packages/${idToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Package deleted successfully ✅");
        fetchPackages();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete package ❌");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
      setIdToDelete(null);
    }
  };

  const filteredPackages = Array.isArray(packages) ? packages.filter((pkg: any) => 
    pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search packages..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link 
          href="/admin/packages/new"
          className="bg-primary hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl flex items-center space-x-2 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
        >
          <Plus size={20} />
          <span>Add New Package</span>
        </Link>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-[450px] bg-gray-200 animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPackages.map((pkg: any, i: number) => (
              <motion.div
                key={pkg._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative"
              >
                <div className="relative h-56 overflow-hidden">
                  <SafeImage 
                    src={pkg.image} 
                    alt={pkg.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <PackageIcon size={14} className="text-primary" />
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">{pkg.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link 
                      href={`/admin/packages/${pkg._id}/edit`}
                      className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-700 hover:text-primary hover:bg-white transition-all shadow-sm"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(pkg._id)}
                      className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-2 text-primary mb-2">
                    <Clock size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">{pkg.duration}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 line-clamp-1">{pkg.name}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Price</p>
                      <p className="text-2xl font-black text-gray-900">₹{pkg.price}</p>
                    </div>
                    <Link 
                      href="/packages"
                      className="p-3 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Package?"
        message="You're about to permanently delete this travel package. This action cannot be undone."
        confirmText="Delete Package"
      />
    </div>
  );
}
