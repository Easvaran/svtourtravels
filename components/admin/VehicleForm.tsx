"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  ArrowLeft, 
  Car, 
  IndianRupee, 
  Users, 
  Eye,
  Briefcase,
  Upload,
  Settings,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import SafeImage from "../SafeImage";
import ImageUploader from "./ImageUploader";

interface VehicleFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function VehicleForm({ initialData, isEdit = false }: VehicleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    type: initialData?.type || "Sedan",
    oneWayPrice: initialData?.oneWayPrice || "",
    roundTripPrice: initialData?.roundTripPrice || "",
    oneWayBeta: initialData?.oneWayBeta || "",
    roundTripBeta: initialData?.roundTripBeta || "",
    numBags: initialData?.numBags || "2",
    seats: initialData?.seats || "",
    thumbnail: initialData?.thumbnail || "",
    status: initialData?.status || "active",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    altText: initialData?.altText || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check name at least
    if (!formData.name) {
      toast.error("Vehicle Name is required");
      return;
    }

    setSaving(true);

    try {
      const url = isEdit ? `/api/vehicles/${initialData._id}` : "/api/vehicles";
      const method = isEdit ? "PUT" : "POST";

      const finalFormData = {
        ...formData,
        // Convert empty strings to 0 for numeric fields
        oneWayPrice: Number(formData.oneWayPrice) || 0,
        roundTripPrice: Number(formData.roundTripPrice) || 0,
        oneWayBeta: Number(formData.oneWayBeta) || 0,
        roundTripBeta: Number(formData.roundTripBeta) || 0,
        seats: Number(formData.seats) || 4,
        thumbnail: formData.thumbnail || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
        metaTitle: formData.metaTitle || "",
        metaDescription: formData.metaDescription || "",
        altText: formData.altText || "",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? "Vehicle details updated successfully ✅" : "New vehicle added to fleet successfully ✅");
        router.push("/admin/vehicles");
        router.refresh();
      } else {
        throw new Error(data.error || "Failed to save vehicle");
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
          <h1 className="text-3xl font-black text-gray-900">{isEdit ? "Edit Vehicle" : "Add New Vehicle"}</h1>
          <p className="text-gray-500 font-medium">Configure vehicle details and pricing</p>
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
          <button
            disabled={saving}
            type="submit"
            className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-primary text-white font-black flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>{isEdit ? "Update Vehicle" : "Save Vehicle"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs */}
          <div className="flex gap-2 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`flex-1 px-6 py-3 rounded-[1.5rem] font-black text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "general"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Settings size={18} />
              <span>General</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pricing")}
              className={`flex-1 px-6 py-3 rounded-[1.5rem] font-black text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "pricing"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <IndianRupee size={18} />
              <span>Pricing</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`flex-1 px-6 py-3 rounded-[1.5rem] font-black text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "seo"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FileText size={18} />
              <span>SEO</span>
            </button>
          </div>

          {/* General Tab */}
          {activeTab === "general" && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">01</span>
                <span>General Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Vehicle Name</label>
                  <div className="relative group">
                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text" 
                      placeholder="Ex: Tempo Traveller Luxury"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        setFormData({ ...formData, name, slug });
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Vehicle Type</label>
                  <select
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none shadow-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury Van">Luxury Van</option>
                    <option value="Minibus">Minibus</option>
                    <option value="Coach">Coach</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Status</label>
                  <select
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none shadow-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Number of Bags</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text" 
                      placeholder="Ex: 2-3"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.numBags}
                      onChange={(e) => setFormData({ ...formData, numBags: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Seating Capacity</label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="number" 
                      placeholder="Ex: 12"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                <span className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-sm">02</span>
                <span>Pricing & Capacity</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">One Way Price (₹/km)</label>
                  <div className="relative group">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="number" 
                      placeholder="Ex: 14"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.oneWayPrice}
                      onChange={(e) => setFormData({ ...formData, oneWayPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Round Trip Price (₹/km)</label>
                  <div className="relative group">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="number" 
                      placeholder="Ex: 13"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.roundTripPrice}
                      onChange={(e) => setFormData({ ...formData, roundTripPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">One Way Beta (₹/day)</label>
                  <div className="relative group">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="number" 
                      placeholder="Ex: 400"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.oneWayBeta}
                      onChange={(e) => setFormData({ ...formData, oneWayBeta: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Round Trip Beta (₹/day)</label>
                  <div className="relative group">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="number" 
                      placeholder="Ex: 500"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.roundTripBeta}
                      onChange={(e) => setFormData({ ...formData, roundTripBeta: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SEO Tab */}
          {activeTab === "seo" && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                <span className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-sm">03</span>
                <span>SEO Settings</span>
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Meta Title</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text" 
                      placeholder="SEO title for search engines"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium ml-1">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Meta Description</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <textarea
                      placeholder="SEO description for search engines"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 min-h-[120px] resize-none"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium ml-1">
                    Recommended: 150-160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Image Alt Text</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text" 
                      placeholder="Alternative text for vehicle image"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.altText}
                      onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium ml-1">
                    Describes the image for accessibility and SEO
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Live Preview */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <Upload size={20} className="text-blue-600" />
              <span>Vehicle Image</span>
            </h3>
            <ImageUploader 
              label="Vehicle Display Image"
              description="Upload a high-quality photo of the vehicle or provide a direct image link."
              value={formData.thumbnail}
              onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4">
              If left empty, a professional default image will be used.
            </p>
          </section>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20 space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h4 className="text-xl font-black">Pricing Card Preview</h4>
            
            <div className="bg-white rounded-[2rem] p-4 text-gray-900 shadow-xl">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
                <SafeImage 
                  src={formData.thumbnail || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"} 
                  alt={formData.altText || "Preview"} 
                  fill
                  className="object-cover"
                />
              </div>
              <h5 className="text-lg font-black mb-4 text-center">{formData.name || "Vehicle Name"}</h5>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                  <p className="text-[8px] font-black text-emerald-800 uppercase tracking-widest mb-0.5">One Way</p>
                  <p className="text-xs font-black">₹{formData.oneWayPrice || 0}/km</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
                  <p className="text-[8px] font-black text-blue-800 uppercase tracking-widest mb-0.5">Round Trip</p>
                  <p className="text-xs font-black">₹{formData.roundTripPrice || 0}/km</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">One Way Beta</p>
                  <p className="text-xs font-black text-gray-900">₹{formData.oneWayBeta || 0}<span className="text-gray-500 ml-0.5">/day</span></p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Round Trip Beta</p>
                  <p className="text-xs font-black text-gray-900">₹{formData.roundTripBeta || 0}<span className="text-gray-500 ml-0.5">/day</span></p>
                </div>
              </div>

              <button type="button" className="w-full py-3 mt-4 rounded-xl bg-emerald-500 text-white text-xs font-black uppercase tracking-widest">
                Book {formData.name || "Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
