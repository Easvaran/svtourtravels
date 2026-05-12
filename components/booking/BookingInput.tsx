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
  const baseClasses = "w-full bg-white border border-gray-200 rounded-xl h-14 pl-12 pr-4 focus:border-[#00bcd4] focus:ring-4 focus:ring-[#00bcd4]/10 outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal text-sm shadow-sm";

  return (
    <div className="space-y-2 w-full mb-4">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00bcd4] transition-colors pointer-events-none z-10">
          <Icon size={18} />
        </div>
        
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
