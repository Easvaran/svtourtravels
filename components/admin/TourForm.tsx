"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Save, 
  ArrowLeft, 
  MapPin,
  IndianRupee,
  Navigation,
  Clock,
  Star,
  Eye,
  Navigation2,
  ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";
import SafeImage from "../SafeImage";

interface TourFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function TourForm({ initialData, isEdit = false }: TourFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    from: initialData?.from || "",
    to: initialData?.to || "",
    distance: initialData?.distance || "",
    duration: initialData?.duration || "",
    price: initialData?.price || "",
    isPopular: initialData?.isPopular || false,
    status: initialData?.status || "active",
    image: initialData?.image || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from || !formData.to || !formData.price) {
      toast.error("From, To, and Price are required");
      return;
    }

    setSaving(true);

    try {
      const url = isEdit ? `/api/tours/${initialData._id}` : "/api/tours";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
        toast.success(isEdit ? "Tour updated successfully ✅" : "New tour added successfully ✅", {
          duration: 5000,
          icon: '✨',
        });
        // Don't redirect immediately so user can see preview button
        setTimeout(() => {
          if (!isEdit) router.push("/admin/tours");
          router.refresh();
        }, 2000);
      } else {
        throw new Error(data.error || "Failed to save tour");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-0 z-30 bg-gray-50/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-gray-100 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{isEdit ? "Edit Tour" : "Add New Tour"}</h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 font-medium">Configure one-way destination details</p>
            {isEdit && (
              <Link 
                href="/tours" 
                target="_blank"
                className="text-[10px] font-black text-[#0870b8] uppercase tracking-widest flex items-center gap-1.5 hover:underline"
              >
                <Eye size={14} />
                Preview on Website
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-black flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Cancel</span>
          </button>
          
          {isSaved && (
            <Link
              href="/tours"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-[#0870b8] text-white font-black flex items-center justify-center space-x-2 hover:bg-[#065a94] transition-all shadow-lg shadow-[#0870b8]/20 animate-in fade-in zoom-in"
            >
              <Eye size={20} />
              <span>View Tour</span>
            </Link>
          )}

          <button
            disabled={saving}
            type="submit"
            className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-[#10b981] text-white font-black flex items-center justify-center space-x-2 hover:bg-[#059669] transition-all shadow-lg shadow-[#10b981]/20 disabled:opacity-70"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>{isEdit ? "Update Tour" : "Save Tour"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <Navigation size={20} className="text-[#10b981]" />
              <span>Route Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">From (Origin)</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" size={20} />
                  <input
                    type="text" 
                    placeholder="Ex: Chennai"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">To (Destination)</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" size={20} />
                  <input
                    type="text" 
                    placeholder="Ex: Bengaluru"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Distance (km)</label>
                <input
                  type="text" 
                  placeholder="Ex: 336 km"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Duration</label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" size={20} />
                  <input
                    type="text" 
                    placeholder="Ex: 6 hrs"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Starting Price (₹)</label>
                <div className="relative group">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" size={20} />
                  <input
                    type="number" 
                    placeholder="Ex: 5104"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <ImageIcon size={20} className="text-[#10b981]" />
              <span>Tour Visuals</span>
            </h3>
            <ImageUploader 
              label="Tour Banner Image"
              description="This image will be shown on the tour list and details page."
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <Star size={20} className="text-[#10b981]" />
              <span>Options & Status</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Status</label>
                <select
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#10b981]/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none shadow-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl h-full self-end">
                <input
                  type="checkbox"
                  id="isPopular"
                  className="w-5 h-5 accent-[#10b981] rounded cursor-pointer"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                <label htmlFor="isPopular" className="text-sm font-black text-gray-700 cursor-pointer">
                  Mark as Popular (Yellow Highlight)
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Live Preview */}
        <div className="space-y-8">
          <div className="bg-[#10b981] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#10b981]/20 space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h4 className="text-xl font-black">Tour Card Preview</h4>
            
            <div className={`bg-white rounded-[2.5rem] border ${formData.isPopular ? 'border-yellow-400 ring-2 ring-yellow-400 ring-opacity-20 shadow-xl' : 'border-gray-100 shadow-sm'} transition-all overflow-hidden flex flex-col text-gray-900`}>
              {formData.image && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-gray-100">
                  <SafeImage src={formData.image} alt="Tour Preview" fill className="object-cover" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1 relative">
                {formData.isPopular && (
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
                    <span className="text-lg font-black text-gray-900">{formData.from || "From"}</span>
                    <span className="text-lg font-black text-gray-900">{formData.to || "To"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</span>
                    <div className="flex items-center gap-1.5 text-[#10b981] font-bold text-sm">
                      <Navigation size={14} className="rotate-45" />
                      {formData.distance || "0 km"}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</span>
                    <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
                      <Clock size={14} />
                      {formData.duration || "0 hrs"}
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting from</span>
                    <span className="text-2xl font-black text-[#10b981]">₹{(Number(formData.price) || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
