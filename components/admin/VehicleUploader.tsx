"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import toast from "react-hot-toast";

interface VehicleUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
}

export default function VehicleUploader({ label, value, onChange, description }: VehicleUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
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
      
      // Get response as text first for safety
      const text = await res.text();
      
      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid response from server. Expected JSON.");
      }
      
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      
      if (data.url) {
        onChange(data.url);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error("Server returned success but no URL in response");
      }
    } catch (error: any) {
      console.error("Vehicle upload error:", error);
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-gray-100 group">
            <SafeImage src={value} alt="Preview" fill className="object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
              ) : (
                <Upload className="w-10 h-10 text-gray-400 mb-3 group-hover:text-primary transition-colors" />
              )}
              <p className="mb-2 text-sm text-gray-500 font-bold">
                {uploading ? "Uploading..." : "Click to upload vehicle thumbnail"}
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG or WEBP (Max. 5MB)</p>
            </div>
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
          </label>
        )}
      </div>
    </div>
  );
}
