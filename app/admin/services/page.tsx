"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Settings, 
  Search, 
  Edit,
  Trash2,
  Star,
  Car,
  Plane,
  Clock,
  Repeat
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import SafeImage from "@/components/SafeImage";

const iconMap: { [key: string]: any } = {
  Car,
  Plane,
  Clock,
  Repeat,
  Settings,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
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
      const res = await fetch(`/api/services/${idToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted successfully");
        setServices(services.filter(s => s._id !== idToDelete));
        setShowConfirm(false);
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeletingId(null);
      setIdToDelete(null);
    }
  };

  const filteredServices = Array.isArray(services) ? services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Manage Services</h1>
          <p className="text-gray-500 font-medium">Configure the service boxes on your homepage</p>
        </div>
        <Link 
          href="/admin/services/add"
          className="bg-[#00bcd4] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-[#0097a7] transition-all shadow-lg shadow-[#00bcd4]/20 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Service</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00bcd4] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search services..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#00bcd4]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Settings;
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col"
              >
                {/* Image Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
                  <SafeImage 
                    src={service.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"} 
                    alt={service.title} 
                    fill 
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {service.isPopular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-10">
                      <Star size={10} className="fill-current" />
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#eab308]/5 rounded-bl-[3rem] -z-0 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="text-[#eab308] mb-3">
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/services/edit/${service._id}`}
                        className="flex-1 bg-gray-50 hover:bg-[#0870b8] text-gray-700 hover:text-white px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <Edit size={14} />
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(service._id)}
                        disabled={deletingId === service._id}
                        className="w-12 h-12 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                      >
                        {deletingId === service._id ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {filteredServices.length === 0 && !loading && (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <Settings className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-black text-gray-900">No services found</h3>
          <p className="text-gray-500 font-medium mb-8">Start by adding your first service box.</p>
          <Link 
            href="/admin/services/add"
            className="inline-flex items-center gap-2 bg-[#00bcd4] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#0097a7] transition-all shadow-lg shadow-[#00bcd4]/20"
          >
            <Plus size={20} />
            <span>Add Your First Service</span>
          </Link>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        isLoading={!!deletingId}
        title="Delete Service?"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete Service"
      />
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
