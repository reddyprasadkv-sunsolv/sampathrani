'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/imageUtils';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  Video,
  Award,
  Zap,
  Heart,
  Compass
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function ProgramsPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const openBooking = (service?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service } }));
    }
  };

  const programs = content?.programs || [];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Transformation Curriculum"
          title="Our Holistic Empowerment Programs"
          subtitle="Discover tailored 1-on-1 life coaching, accredited Law of Attraction teacher certifications, and vibrational healing workshops for every stage of your journey."
        />

        {/* 7 Programs Detailed Grid */}
        <div className="space-y-12">
          {programs.map((prog: any, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={prog.id}
                id={prog.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D5BDAF]/60 shadow-md hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'} flex justify-center`}>
                    <div className="relative w-full max-w-md">
                      <div className="absolute -inset-1 rounded-3xl bg-[#D5BDAF]/30 blur-md" />
                      <div className="relative bg-white rounded-3xl overflow-hidden p-2.5 border border-[#D5BDAF]">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                          <Image
                            src={getImageUrl(prog.image || '/images/welcome.jpg')}
                            alt={prog.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'} space-y-5`}>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
                        {prog.format || 'In-Person & Online'}
                      </span>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18] mt-2">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8C7769] font-semibold font-serif-luxury italic mt-1">
                        {prog.tagline}
                      </p>
                    </div>

                    <p className="text-[#4A3E35] text-xs sm:text-sm leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Packages / Duration */}
                    {prog.packages && prog.packages.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#7E6F64] font-bold mb-2">
                          Available Session Packages:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {prog.packages.map((pkg: string, pIdx: number) => (
                            <span
                              key={pIdx}
                              className="px-3 py-1.5 rounded-xl bg-[#F5EBE0] border border-[#D5BDAF]/60 text-xs text-[#261E18] font-semibold"
                            >
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features & Key Takeaways */}
                    {prog.features && prog.features.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-xs uppercase tracking-wider text-[#7E6F64] font-bold mb-2">
                          Key Curriculum Highlights:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {prog.features.map((feat: string, fIdx: number) => (
                            <div key={fIdx} className="flex items-start space-x-2 text-xs text-[#5A4D43]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7769] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => openBooking(prog.title)}
                        className="px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-white shadow-md shadow-[#382F28]/15 transition-all"
                      >
                        Enroll / Book Consultation
                      </button>

                      <a
                        href={`https://wa.me/919848709677?text=${encodeURIComponent(`Hello Dr. Sampath Rani, I am interested in ${prog.title}. Could you share details?`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-emerald-600 text-emerald-800 hover:bg-emerald-50 transition-all font-semibold"
                      >
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
