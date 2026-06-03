"use client";

import { useState } from "react";
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  placeholder?: string;
}

export default function ImageUploader({ label, value, onChange, description, placeholder }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      if (data.url) {
        onChange(data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!tempUrl) return;
    onChange(tempUrl);
    setTempUrl("");
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black text-gray-600 uppercase tracking-widest ml-1">{label}</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline"
          >
            <LinkIcon size={12} />
            {showUrlInput ? "Hide Link Input" : "Add via Link"}
          </button>
        </div>
      </div>
      
      {description && <p className="text-[10px] text-gray-500 font-medium ml-1">{description}</p>}
      
      {showUrlInput && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder={placeholder || "Paste image URL here..."}
            className="flex-1 bg-gray-50 border-2 border-transparent rounded-xl py-3 px-4 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="bg-primary text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90"
          >
            Apply
          </button>
        </div>
      )}

      <div className="relative group">
        {value ? (
          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gray-100 group shadow-sm">
            <SafeImage src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onChange("")}
                className="bg-red-500 text-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-all"
                title="Remove Image"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group overflow-hidden">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              {uploading ? (
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              ) : (
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              )}
              <p className="text-sm text-gray-600 font-black uppercase tracking-tight mb-1">
                {uploading ? "Uploading..." : "Upload Tour Image"}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                PNG, JPG or WEBP (Max. 5MB)
              </p>
            </div>
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
          </label>
        )}
      </div>
    </div>
  );
}
