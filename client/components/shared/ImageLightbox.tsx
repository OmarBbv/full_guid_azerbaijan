"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-100000 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <div className="text-white/60 font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        <button
          onClick={handlePrevious}
          className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all active:scale-90 z-10 hidden md:block"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-contain select-none animate-in zoom-in-95 duration-300"
            unoptimized
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all active:scale-90 z-10 hidden md:block"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="absolute bottom-12 flex items-center gap-8 md:hidden">
        <button
          onClick={handlePrevious}
          className="p-4 rounded-full bg-white/10 text-white transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white/10 text-white transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>,
    document.body
  );
}
