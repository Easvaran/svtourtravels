"use client";

import { useState } from "react";
import { Upload, X, RotateCw, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface Vehicle360UploaderProps {
  frames: string[];
  onChange: (frames: string[]) => void;
}

export default function Vehicle360Uploader({ frames, onChange }: Vehicle360UploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [...frames];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }
      onChange(uploadedUrls);
      toast.success(`Uploaded ${files.length} frames`);
    } catch (error: any) {
      toast.error("Failed to upload some frames");
    } finally {
      setUploading(false);
    }
  };

  const removeFrame = (index: number) => {
    const newFrames = [...frames];
    newFrames.splice(index, 1);
    onChange(newFrames);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">360° Rotation Frames</label>
        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {frames.length} / 36 Frames
        </span>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
        {frames.map((url, index) => (
          <div key={index} className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden group border border-gray-100">
            <img src={url} alt={`Frame ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeFrame(index)}
                className="bg-red-500 text-white p-1.5 rounded-lg shadow-lg"
              >
                <X size={12} />
              </button>
            </div>
            <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 rounded font-bold">
              {index + 1}
            </div>
          </div>
        ))}
        
        {frames.length < 36 && (
          <label className="flex flex-col items-center justify-center aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleUpload} 
              disabled={uploading} 
              accept="image/*" 
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-400 italic">Upload up to 36 frames for a smooth 360° rotation experience.</p>
    </div>
  );
}
