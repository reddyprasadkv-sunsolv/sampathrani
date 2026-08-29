'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.youtubeId) {
        setVideoId(e.detail.youtubeId);
        setTitle(e.detail.title || 'Soul Video / Testimonial');
        setIsOpen(true);
      }
    };

    window.addEventListener('open-video-modal', handleOpen);
    return () => window.removeEventListener('open-video-modal', handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    setVideoId('');
  };

  if (!isOpen || !videoId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-[#D5BDAF] bg-[#1F1915] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#D5BDAF]/20 bg-[#261E18]">
          <h4 className="font-serif-luxury font-bold text-[#FAF8F5] text-base truncate pr-4">
            {title}
          </h4>
          <button
            onClick={close}
            className="p-2 rounded-full text-[#D6CCC2] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
