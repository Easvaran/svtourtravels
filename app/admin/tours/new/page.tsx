"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Clock,
  IndianRupee,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function TourFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image: "",
    price: "",
    duration: "",
    rating: 5.0,
    description: "",
    itinerary: [{ day: 1, title: "", description: "" }],
    inclusions: [""],
    exclusions: [""],
    featured: false
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/tours/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            ...data,
            itinerary: data.itinerary || [{ day: 1, title: "", description: "" }],
            inclusions: data.inclusions || [""],
            exclusions: data.exclusions || [""]
          });
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/tours/${id}` : "/api/tours";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(`Tour ${isEdit ? "updated" : "created"} successfully`);
        router.push("/admin/tours");
      } else {
        const error = await res.json();
        toast.error(error.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save tour");
    } finally {
      setSaving(false);
    }
  };

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, title: "", description: "" }]
    });
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    // Re-assign days
    const remapped = newItinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setFormData({ ...formData, itinerary: remapped });
  };

  const handleItineraryChange = (index: number, field: string, value: string) => {
    const newItinerary = [...formData.itinerary];
    (newItinerary[index] as any)[field] = value;
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleArrayChange = (field: "inclusions" | "exclusions", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "inclusions" | "exclusions") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "inclusions" | "exclusions", index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData({ ...formData, image: data.url });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-10 w-48 bg-gray-200 rounded-xl" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-96 bg-gray-200 rounded-3xl" />
      <div className="h-96 bg-gray-200 rounded-3xl" />
    </div>
  </div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-24">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 font-bold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Tours</span>
        </button>
        <button 
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl flex items-center space-x-2 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 disabled:opacity-70"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
          <span>{isEdit ? "Update Tour" : "Create Tour"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">01</span>
              <span>General Information</span>
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tour Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Mesmerizing Kerala Backwaters"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <div className="relative">
                    <IndianRupee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: 15,999"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: 4 Days / 3 Nights"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tour Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the tour highlights..."
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Itinerary Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
                <span className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-sm">02</span>
                <span>Itinerary Details</span>
              </h3>
              <button 
                type="button"
                onClick={addItineraryDay}
                className="p-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {formData.itinerary?.map((item, idx) => (
                <div key={idx} className="relative p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4">
                  <button 
                    type="button"
                    onClick={() => removeItineraryDay(idx)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg">
                      {item.day}
                    </div>
                    <input 
                      required
                      type="text" 
                      placeholder={`Day ${item.day} Title`}
                      className="flex-1 bg-white border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-primary/30 font-bold text-gray-900"
                      value={item.title}
                      onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                    />
                  </div>
                  <textarea 
                    required
                    rows={2}
                    placeholder="Activities and details for this day..."
                    className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-primary/30 font-medium text-gray-600 resize-none"
                    value={item.description}
                    onChange={(e) => handleItineraryChange(idx, "description", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Media & More */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center text-sm">03</span>
              <span>Media & Settings</span>
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Featured Image</label>
                  <label className="cursor-pointer text-xs font-black text-primary hover:text-blue-700 transition-colors uppercase tracking-widest flex items-center gap-1">
                    <Plus size={14} />
                    <span>Upload Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
                
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    required
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-12 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  {formData.image && (
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(formData.image)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      title="Copy URL"
                    >
                      <Plus size={18} className="rotate-45" />
                    </button>
                  )}
                </div>
              </div>

              {uploading && (
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-primary/20">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {formData.image && !uploading && (
                <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-100 group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(formData.image)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Rating</label>
                  <div className="relative">
                    <Star size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      step="0.1"
                      min="1"
                      max="5"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Featured</label>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                    className={cn(
                      "w-full h-[60px] rounded-2xl font-black transition-all flex items-center justify-center space-x-2 border-2",
                      formData.featured 
                        ? "bg-primary/5 border-primary text-primary" 
                        : "bg-gray-50 border-transparent text-gray-400"
                    )}
                  >
                    <CheckCircle2 size={20} />
                    <span>{formData.featured ? "Featured" : "Regular"}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-sm">04</span>
              <span>Inclusions & Exclusions</span>
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-green-600 uppercase tracking-widest ml-1">Inclusions</label>
                  <button type="button" onClick={() => addArrayItem("inclusions")} className="text-green-600"><Plus size={16} /></button>
                </div>
                {formData.inclusions?.map((item, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <input 
                      type="text" 
                      className="flex-1 bg-gray-50 border border-transparent rounded-xl py-2 px-4 focus:bg-white focus:border-green-100 outline-none font-bold text-gray-900 text-sm"
                      value={item}
                      onChange={(e) => handleArrayChange("inclusions", idx, e.target.value)}
                    />
                    <button type="button" onClick={() => removeArrayItem("inclusions", idx)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-red-600 uppercase tracking-widest ml-1">Exclusions</label>
                  <button type="button" onClick={() => addArrayItem("exclusions")} className="text-red-600"><Plus size={16} /></button>
                </div>
                {formData.exclusions?.map((item, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <input 
                      type="text" 
                      className="flex-1 bg-gray-50 border border-transparent rounded-xl py-2 px-4 focus:bg-white focus:border-red-100 outline-none font-bold text-gray-900 text-sm"
                      value={item}
                      onChange={(e) => handleArrayChange("exclusions", idx, e.target.value)}
                    />
                    <button type="button" onClick={() => removeArrayItem("exclusions", idx)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
