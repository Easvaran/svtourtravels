"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | undefined | null;
  fallbackSrc?: string;
}

const SafeImage = ({ 
  src, 
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30 40 L70 40 L70 70 L30 70 Z' fill='none' stroke='%23d1d5db' stroke-width='2'/%3E%3Cpath d='M30 70 L50 50 L70 70' fill='none' stroke='%23d1d5db' stroke-width='2'/%3E%3Ccircle cx='40' cy='50' r='3' fill='%23d1d5db'/%3E%3C/svg%3E", 
  alt, 
  className,
  ...props 
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    const isValidSrc = (url: string | undefined | null) => {
      if (!url) return false;
      return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://");
    };

    if (isValidSrc(src)) {
      setImgSrc(src as string);
      setError(false);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Travel Image"}
      className={`${className} ${error ? "opacity-50" : ""}`}
      onError={(e) => {
        if (!error) {
          setImgSrc(fallbackSrc);
          setError(true);
        }
        if (props.onError) props.onError(e);
      }}
    />
  );
};

export default SafeImage;
