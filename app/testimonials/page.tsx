'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Star,
  Play,
  Quote,
  Video,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import VideoModal from '@/components/VideoModal';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent } from '@/lib/clientData';

export default function TestimonialsPage() {
  const [content, setContent] = useState<any>(defaultContent);
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'book'>('all');

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));

    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#video-testimonials') setActiveTab('videos');
      else if (hash === '#book-reviews') setActiveTab('book');
    }
  }, []);

  const openVideo = (youtubeId: string, title?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-video-modal', { detail: { youtubeId, title } }));
    }
  };

  const testimonials = content?.testimonials;
  const written = testimonials?.written || [];
  const videos = testimonials?.videos || [];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <VideoModal />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Voices of Transformation"
          title="Client Testimonials & Literary Reviews"
          subtitle="Real stories of manifesting prosperity, resolving severe stress, finding balance, and acclaim for 'The Doorway to Your Dreams'."
        />

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#F5EBE0] p-1.5 rounded-full inline-flex border border-[#D5BDAF] space-x-1 sm:space-x-2 shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'videos'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              Video Reviews ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'book'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              MyBook Endorsements
            </button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* VIDEO TESTIMONIALS SECTION */}
        {/* ======================================================= */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div id="video-testimonials" className="mb-20">
            <div className="flex items-center space-x-2 mb-8">
              <Video className="w-5 h-5 text-[#8C7769]" />
              <h3 className="font-serif-luxury text-2xl font-bold text-[#261E18]">
                Workshop & Coaching Video Reviews
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid: any) => (
                <div
                  key={vid.id}
                  onClick={() => openVideo(vid.youtubeId, vid.title)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#D5BDAF]/60 hover:border-[#8C7769] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video bg-[#EDEDE9]">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#261E18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#261E18] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]">
                      {vid.tag || 'Life Coaching'}
                    </span>
                    <h4 className="font-serif-luxury font-bold text-[#261E18] text-sm mt-2 line-clamp-2">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-[#7E6F64] mt-1">
                      By {vid.speaker || 'ESES Academy Participant'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* WRITTEN & BOOK TESTIMONIALS SECTION */}
        {/* ======================================================= */}
        {(activeTab === 'all' || activeTab === 'book') && (
          <div id="book-reviews" className="space-y-8">
            <div className="flex items-center space-x-2 mb-8">
              <BookOpen className="w-5 h-5 text-[#8C7769]" />
              <h3 className="font-serif-luxury text-2xl font-bold text-[#261E18]">
                Book Endorsements & Written Reviews
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {written.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-[#B89986]">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#B89986] text-[#B89986]" />
                        ))}
                      </div>
                      {item.program && (
                        <span className="text-[11px] text-[#8C7769] font-semibold">
                          {item.program}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start space-x-3 mb-4">
                      <Quote className="w-6 h-6 text-[#8C7769] shrink-0 mt-0.5" />
                      <p className="text-[#4A3E35] text-xs sm:text-sm leading-relaxed italic">
                        &quot;{item.review}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EDEDE9]">
                    <div className="font-serif-luxury font-bold text-[#261E18] text-base">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#8C7769] font-medium">
                      {item.designation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
