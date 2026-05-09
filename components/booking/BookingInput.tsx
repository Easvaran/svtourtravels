"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingInputProps {
  label: string;
  name: string;
  value: any;
  onChange: (e: any) => void;
  type?: string;
  placeholder?: string;
  icon: LucideIcon;
  required?: boolean;
  min?: string | number;
  options?: { value: string; label: string }[];
}

export default function BookingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  required = true,
  min,
  options
}: BookingInputProps) {
  const baseClasses = "w-full bg-gray-50 border-2 border-transparent rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-4 focus:border-primary/20 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium text-sm";

  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <div className="relative group">
        <Icon 
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" 
          size={18} 
        />
        
        {type === "select" ? (
          <select
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            className={cn(baseClasses, "appearance-none cursor-pointer")}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            min={min}
            placeholder={placeholder}
            className={baseClasses}
          />
        )}
      </div>
    </div>
  );
}
