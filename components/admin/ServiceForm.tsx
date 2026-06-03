"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  ArrowLeft, 
  Type,
  FileText,
  Star,
  Settings,
  Car,
  Plane,
  Clock,
  Repeat,
  Upload,
  X,
  Eye,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import SafeImage from "../SafeImage";
import ImageUploader from "./ImageUploader";

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const ICONS = [
  { name: "Car", icon: Car },
  { name: "Plane", icon: Plane },
  { name: "Clock", icon: Clock },
  { name: "Repeat", icon: Repeat },
  { name: "Settings", icon: Settings },
];

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    icon: initialData?.icon || "Car",
    isPopular: initialData?.isPopular || false,
    status: initialData?.status || "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return;
    }

    setSaving(true);

    try {
      const url = isEdit ? `/api/services/${initialData._id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? "Service updated successfully ✅" : "New service added successfully ✅");
        router.push("/admin/services");
        router.refresh();
      } else {
        throw new Error(data.error || "Failed to save service");
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
          <h1 className="text-3xl font-black text-gray-900">{isEdit ? "Edit Service" : "Add New Service"}</h1>
          <p className="text-gray-500 font-medium">Configure service details and features</p>
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
            className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-[#00bcd4] text-white font-black flex items-center justify-center space-x-2 hover:bg-[#0097a7] transition-all shadow-lg shadow-[#00bcd4]/20 disabled:opacity-70"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>{isEdit ? "Update Service" : "Save Service"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
            <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Service Title</label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00bcd4] transition-colors" size={20} />
              <input
                type="text" 
                placeholder="Ex: One-Way Drop"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#00bcd4]/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Service Description</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#00bcd4] transition-colors" size={20} />
              <textarea
                placeholder="Ex: Pay only for one side of your journey. No return trip charges."
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-[#00bcd4]/10 focus:bg-white outline-none transition-all font-bold text-gray-900 min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Select Icon</label>
              <div className="grid grid-cols-5 gap-3">
                {ICONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: item.name })}
                      className={`p-4 rounded-xl flex items-center justify-center transition-all ${
                        formData.icon === item.name 
                          ? "bg-[#00bcd4] text-white shadow-lg" 
                          : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={24} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">Status</label>
              <select
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#00bcd4]/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none shadow-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
            <input
              type="checkbox"
              id="isPopular"
              className="w-5 h-5 accent-[#00bcd4] rounded cursor-pointer"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
            />
            <label htmlFor="isPopular" className="text-sm font-black text-gray-700 cursor-pointer">
              Mark as Popular (Will have green background)
            </label>
          </div>
        </section>
        </div>

        {/* Right Column: Image Upload */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <Upload size={20} className="text-[#00bcd4]" />
              <span>Service Image</span>
            </h3>
            <ImageUploader 
              label="Service Display Image"
              description="Upload a high-quality photo of the service or provide a direct image link."
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </section>

          <div className="bg-[#00bcd4] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#00bcd4]/20 space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h4 className="text-xl font-black">Service Card Preview</h4>
            
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full text-gray-900">
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <SafeImage 
                  src={formData.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"} 
                  alt={formData.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#eab308]/5 rounded-bl-[4rem] -z-0 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-[#eab308] mb-3">
                    {(() => {
                      const Icon = ICONS.find(i => i.name === formData.icon)?.icon || Settings;
                      return <Icon size={28} strokeWidth={1.5} />;
                    })()}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">{formData.title || "Service Title"}</h3>
                  
                  <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                    {formData.description || "Service description will appear here. Add details about what this service offers."}
                  </p>

                  <div className="inline-flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <ArrowRight size={14} />
                    </div>
                    <span>Book Now</span>
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
