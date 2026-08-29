'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  GraduationCap,
  Heart,
  Compass,
  Briefcase,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'biography' | 'spiritual' | 'worklife'>('biography');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));

    // Handle hash links in URL
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#spiritual-journey') setActiveTab('spiritual');
      else if (hash === '#past-work-life') setActiveTab('worklife');
      else if (hash === '#official-biography') setActiveTab('biography');
    }
  }, []);

  const openBooking = (service?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service } }));
    }
  };

  const bio = content?.biography;
  const spiritual = content?.spiritualJourney;
  const worklife = content?.pastWorkLife;

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <SectionHeading
          badge="About Dr. Sampath Rani"
          title="Empowering Souls Through Science & Metaphysical Wisdom"
          subtitle="Discover the rich academic heritage, 25-year spiritual path, and multifaceted career of Dr. Sampath Rani Momula."
        />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#F5EBE0] p-1.5 rounded-full inline-flex border border-[#D5BDAF] space-x-1 sm:space-x-2 shadow-sm">
            <button
              onClick={() => setActiveTab('biography')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'biography'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              Official Biography
            </button>
            <button
              onClick={() => setActiveTab('spiritual')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'spiritual'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              Spiritual Journey
            </button>
            <button
              onClick={() => setActiveTab('worklife')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'worklife'
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'text-[#5A4D43] hover:text-[#261E18]'
              }`}
            >
              Past Work Life
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OFFICIAL BIOGRAPHY */}
        {/* ========================================================= */}
        {activeTab === 'biography' && (
          <div id="official-biography" className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-1 rounded-3xl bg-[#D5BDAF]/30 blur-lg" />
                  <div className="relative bg-white rounded-3xl overflow-hidden p-3 border border-[#D5BDAF] shadow-lg">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                      <Image
                        src={bio?.image || '/images/sampath_rani.png'}
                        alt="Dr. Sampath Rani Momula"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#8C7769] font-bold mb-1">
                    Founder of ESES Academy
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#261E18]">
                    {bio?.heading || 'Our Official Biography'}
                  </h3>
                  <p className="text-sm text-[#7E6F64] italic font-serif-luxury mt-1">
                    &quot;Enriched Soul in Empowering Space&quot; — Founded in 2018
                  </p>
                </div>

                <div className="space-y-4 text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                  {bio?.content?.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => openBooking('1-on-1 Life Coaching')}
                    className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-lg shadow-[#382F28]/15 transition-all"
                  >
                    Schedule Coaching Call
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Credentials Box */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D5BDAF]/60 shadow-md">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#261E18]">
                    Academic Degrees & Professional Certifications
                  </h4>
                  <p className="text-xs text-[#7E6F64]">
                    A rare integration of biomedical science, pharmaceutical education, and metaphysical science.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bio?.degrees?.map((deg: string, dIdx: number) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] transition-colors flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8C7769] shrink-0 mt-1" />
                    <span className="text-xs text-[#382F28] font-medium leading-snug">
                      {deg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SPIRITUAL JOURNEY */}
        {/* ========================================================= */}
        {activeTab === 'spiritual' && (
          <div id="spiritual-journey" className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#8C7769] font-bold mb-1">
                    25 Years of Awakening
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#261E18]">
                    {spiritual?.title || 'Highlights of Our Spiritual Journey'}
                  </h3>
                  <p className="text-sm text-[#7E6F64] italic font-serif-luxury mt-1">
                    {spiritual?.subtitle || 'From seeker to master teacher and healer'}
                  </p>
                </div>

                <div className="space-y-4 text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                  {spiritual?.content?.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="rounded-2xl p-5 border-l-4 border-[#8C7769] bg-[#F5EBE0]/60 border border-[#D5BDAF]/40 shadow-sm">
                  <p className="font-serif-luxury italic text-[#261E18] text-sm leading-relaxed">
                    &quot;The true certifications obtained in the spiritual realm are meant to help souls understand the profound unknown—that which can only be felt in the silence of meditation.&quot;
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="bg-white rounded-3xl overflow-hidden p-3 border border-[#D5BDAF] shadow-lg">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                      <Image
                        src={spiritual?.image || '/images/spiritual.jpg'}
                        alt="Spiritual Journey"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PAST WORK LIFE */}
        {/* ========================================================= */}
        {activeTab === 'worklife' && (
          <div id="past-work-life" className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#8C7769] font-bold mb-1">
                    Multidisciplinary Heritage
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#261E18]">
                    {worklife?.title || 'Past Work Life & Professional Experience'}
                  </h3>
                  <p className="text-sm text-[#7E6F64] italic font-serif-luxury mt-1">
                    {worklife?.subtitle || 'Bridging science, healthcare, education & life coaching'}
                  </p>
                </div>

                <div className="space-y-4 text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                  {worklife?.content?.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-[#D5BDAF]/60 text-center shadow-sm">
                    <div className="text-[#382F28] font-bold text-xs uppercase">Science & Labs</div>
                    <div className="text-[11px] text-[#7E6F64]">Teacher & Lab In-Charge</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#D5BDAF]/60 text-center shadow-sm">
                    <div className="text-[#382F28] font-bold text-xs uppercase">Healthcare</div>
                    <div className="text-[11px] text-[#7E6F64]">Pharmacy & Biomedicine</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#D5BDAF]/60 text-center shadow-sm">
                    <div className="text-[#382F28] font-bold text-xs uppercase">Education</div>
                    <div className="text-[11px] text-[#7E6F64]">Child Psychology & B.Ed</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="bg-white rounded-3xl overflow-hidden p-3 border border-[#D5BDAF] shadow-lg">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                      <Image
                        src={worklife?.image || '/images/school-work.jpg'}
                        alt="Past Work Life Collage"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
