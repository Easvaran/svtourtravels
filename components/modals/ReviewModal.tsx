"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send } from "lucide-react";
import { toast } from "react-hot-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReviewModal = ({ isOpen, onClose, onSuccess }: ReviewModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
    tour: "",
  });
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review || !formData.rating) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for your review!");
        onSuccess();
        onClose();
        setFormData({ name: "", review: "", rating: 5, tour: "" });
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
                <p className="text-gray-500 font-medium">How was your journey with us?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating Stars */}
                <div className="flex flex-col items-center space-y-3 py-4 bg-gray-50 rounded-3xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Rating</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          size={32}
                          className={
                            star <= (hoveredRating || formData.rating)
                              ? "text-[#00bcd4] fill-[#00bcd4]"
                              : "text-gray-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl h-14 px-5 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Destination Visited (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Ooty, Kerala"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl h-14 px-5 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900"
                      value={formData.tour}
                      onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Your Review</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about our service, guides, and your overall experience..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-5 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900 resize-none"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#00bcd4] hover:bg-[#0097a7] text-white font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-70 shadow-lg shadow-[#00bcd4]/20"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Review</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
