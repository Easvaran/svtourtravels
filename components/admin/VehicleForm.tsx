"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Save, 
  ArrowLeft, 
  Car, 
  Info, 
  IndianRupee, 
  Users, 
  Wind, 
  Star,
  Layout,
  Eye
} from "lucide-react";
import VehicleUploader from "./VehicleUploader";
import Vehicle360Uploader from "./Vehicle360Uploader";
import toast from "react-hot-toast";

interface VehicleFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function VehicleForm({ initialData, isEdit = false }: VehicleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    type: initialData?.type || "Sedan",
    description: initialData?.description || "",
    pricePerDay: initialData?.pricePerDay || "",
    seats: initialData?.seats || "",
    airConditioned: initialData?.airConditioned ?? true,
    isPopular: initialData?.isPopular ?? false,
    thumbnail: initialData?.thumbnail || "",
    gallery: initialData?.gallery || [],
    frames360: initialData?.frames360 || [],
    status: initialData?.status || "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/vehicles/${initialData._id}` : "/api/vehicles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
          <p className="text-gray-500 font-medium">Configure vehicle details and interactive 360° preview</p>
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
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">01</span>
              <span>General Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Name</label>
                <div className="relative group">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    required
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
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Slug (URL)</label>
                <input
                  required
                  type="text" 
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-400"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Type</label>
                <select
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none"
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
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                <select
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the vehicle highlights, comfort, and best use case..."
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-sm">02</span>
              <span>Pricing & Capacity</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price Per Day (₹)</label>
                <div className="relative group">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    required
                    type="number" 
                    placeholder="Ex: 4500"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Seating Capacity</label>
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    required
                    type="number" 
                    placeholder="Ex: 12"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full relative transition-colors ${formData.airConditioned ? 'bg-primary' : 'bg-gray-200'}`}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formData.airConditioned}
                    onChange={() => setFormData({ ...formData, airConditioned: !formData.airConditioned })}
                  />
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.airConditioned ? 'left-7' : 'left-1'}`} />
                </div>
                <div className="flex items-center space-x-2">
                  <Wind size={18} className={formData.airConditioned ? 'text-primary' : 'text-gray-400'} />
                  <span className="text-sm font-black text-gray-700">Air Conditioned</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full relative transition-colors ${formData.isPopular ? 'bg-secondary' : 'bg-gray-200'}`}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formData.isPopular}
                    onChange={() => setFormData({ ...formData, isPopular: !formData.isPopular })}
                  />
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isPopular ? 'left-7' : 'left-1'}`} />
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={18} className={formData.isPopular ? 'text-secondary' : 'text-gray-400'} />
                  <span className="text-sm font-black text-gray-700">Most Popular Badge</span>
                </div>
              </label>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center text-sm">03</span>
              <span>Interactive 360° Preview</span>
            </h3>
            <Vehicle360Uploader 
              frames={formData.frames360}
              onChange={(frames) => setFormData({ ...formData, frames360: frames })}
            />
          </section>
        </div>

        {/* Right Column: Media */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <Layout size={20} className="text-blue-600" />
              <span>Media Assets</span>
            </h3>
            <VehicleUploader 
              label="Thumbnail Image" 
              value={formData.thumbnail}
              onChange={(url) => setFormData({ ...formData, thumbnail: url })}
              description="Main image used for lists and forms"
            />
          </section>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20 space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h4 className="text-xl font-black">Live Preview</h4>
            <p className="text-white/70 text-sm font-medium">Your changes will automatically reflect on the tour details pages.</p>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50">
                <span>Vehicle Name</span>
                <span className="text-white">{formData.name || "Untitled"}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50">
                <span>Price</span>
                <span className="text-white">₹{Number(formData.pricePerDay).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
