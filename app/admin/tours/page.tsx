"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Star,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      if (res.ok) {
        setTours(Array.isArray(data) ? data : []);
      } else {
        toast.error(data.error || "Failed to fetch tours");
        setTours([]);
      }
    } catch (error) {
      toast.error("Failed to connect to the server");
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Tour deleted successfully");
        fetchTours();
      }
    } catch (error) {
      toast.error("Failed to delete tour");
    }
  };

  const filteredTours = Array.isArray(tours) ? tours.filter((tour: any) => 
    tour.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search tours..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link 
          href="/admin/tours/new"
          className="bg-primary hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl flex items-center space-x-2 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
        >
          <Plus size={20} />
          <span>Add New Tour</span>
        </Link>
      </div>

      {/* Tours Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-[450px] bg-gray-200 animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTours.map((tour: any, i: number) => (
              <motion.div
                key={tour._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative"
              >
                <div className="relative h-56 overflow-hidden">
                  <SafeImage 
                    src={tour.image} 
                    alt={tour.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Star size={14} className="text-secondary fill-secondary" />
                    <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link 
                      href={`/admin/tours/${tour._id}/edit`}
                      className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-700 hover:text-primary hover:bg-white transition-all shadow-sm"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(tour._id)}
                      className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-2 text-primary mb-2">
                    <Clock size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">{tour.duration}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 line-clamp-1">{tour.title}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Starts from</p>
                      <p className="text-2xl font-black text-gray-900">₹{tour.price}</p>
                    </div>
                    <Link 
                      href={`/tours/${tour.slug}`}
                      target="_blank"
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
    </div>
  );
}
