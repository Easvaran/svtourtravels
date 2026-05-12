"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Search, Filter, RefreshCw, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((r) => r._id !== id));
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.tour && r.tour.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-poppins">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
          <p className="text-gray-500 font-medium">Review and moderate customer feedback</p>
        </div>
        <button
          onClick={fetchReviews}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00bcd4] transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name, tour, or review content..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
          <div className="w-12 h-12 border-4 border-[#00bcd4] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-500">No customer feedback matches your current search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, i) => (
              <motion.div
                key={review._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{review.name}</h4>
                        {review.tour && (
                          <span className="inline-block px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] rounded-full text-[10px] font-bold uppercase tracking-widest mt-1">
                            📍 {review.tour}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < review.rating ? "text-secondary fill-secondary" : "text-gray-200"}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 font-medium text-lg leading-relaxed italic">
                      "{review.review}"
                    </p>
                    
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Submitted on {new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={deletingId === review._id}
                      onClick={() => handleDelete(review._id)}
                      className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm hover:shadow-red-100 flex items-center space-x-2 group/btn"
                    >
                      {deletingId === review._id ? (
                        <RefreshCw size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Trash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                          <span className="font-bold text-sm">Delete Review</span>
                        </>
                      )}
                    </button>
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
