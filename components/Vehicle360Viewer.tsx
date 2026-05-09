"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SafeImage from "./SafeImage";
import { RotateCw, MoveHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface Vehicle360ViewerProps {
  framesPath: string;
  frameCount: number;
  imageAlt: string;
  fallbackImage: string;
  frames360?: string[];
}

const Vehicle360Viewer = ({ framesPath, frameCount, imageAlt, fallbackImage, frames360 }: Vehicle360ViewerProps) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasFramesError, setHasFramesError] = useState(!frames360 || frames360.length === 0);

  // Update error state if frames360 changes
  useEffect(() => {
    setHasFramesError(!frames360 || frames360.length === 0);
  }, [frames360]);

  // Auto-rotation logic
  useEffect(() => {
    if (hasFramesError) return; // Stop everything if frames are missing
    
    let interval: NodeJS.Timeout;
    if (autoRotate && !isDragging) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev >= frameCount ? 1 : prev + 1));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [autoRotate, isDragging, frameCount, hasFramesError]);

  const handleStart = (clientX: number) => {
    if (hasFramesError) return;
    setIsDragging(true);
    setStartX(clientX);
    setAutoRotate(false);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;

    const diff = startX - clientX;
    const sensitivity = 10; // Pixels per frame change
    
    if (Math.abs(diff) > sensitivity) {
      const framesToMove = Math.floor(diff / sensitivity);
      let nextFrame = currentFrame + framesToMove;
      
      while (nextFrame > frameCount) nextFrame -= frameCount;
      while (nextFrame < 1) nextFrame += frameCount;
      
      setCurrentFrame(nextFrame);
      setStartX(clientX);
    }
  }, [isDragging, startX, currentFrame, frameCount]);

  const handleEnd = () => {
    setIsDragging(false);
    // Resume auto-rotate after a delay
    setTimeout(() => setAutoRotate(true), 3000);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  
  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-[16/9] w-full bg-gray-50 rounded-3xl overflow-hidden ${!hasFramesError ? 'cursor-grab active:cursor-grabbing' : ''} group`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {hasFramesError ? (
          <SafeImage
            src={fallbackImage}
            alt={imageAlt}
            fill
            className="object-cover select-none"
            priority
          />
        ) : (
          <SafeImage
            src={frames360 ? frames360[currentFrame - 1] : `${framesPath}${currentFrame}.webp`}
            alt={`${imageAlt} - Frame ${currentFrame}`}
            fill
            className="object-contain p-4 select-none transition-opacity duration-100"
            priority
            onError={() => {
              console.log(`Frame missing, falling back to static image`);
              setHasFramesError(true);
            }}
          />
        )}
      </div>

      {/* 360 Indicator */}
      {!hasFramesError && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          <RotateCw size={14} className="animate-spin-slow" />
          <span>360° View</span>
          <div className="w-px h-3 bg-white/20 mx-2" />
          <MoveHorizontal size={14} />
          <span>Drag to rotate</span>
        </div>
      )}

      {/* Progress bar */}
      {!hasFramesError && (
        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
          <motion.div 
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${(currentFrame / frameCount) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Vehicle360Viewer;
