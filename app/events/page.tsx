'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Filter
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent } from '@/lib/clientData';

export default function EventsPage() {
  const [content, setContent] = useState<any>(defaultContent);
  const [filter, setFilter] = useState<'All' | 'Hybrid' | 'Online' | 'In-Person'>('All');

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const openBooking = (service?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service } }));
    }
  };

  const events = content?.events || [];

  const filteredEvents =
    filter === 'All'
      ? events
      : events.filter((e: any) => e.modality?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Live Masterclasses & Workshops"
          title="Upcoming Workshops & Certifications"
          subtitle="Experience transformative group shifts with Dr. Sampath Rani Momula in-person in Hyderabad or via live interactive Zoom cohorts."
        />

        {/* Filter Pills */}
        <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
          <div className="flex items-center space-x-1.5 text-xs text-[#7E6F64] mr-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-[#8C7769]" />
            <span>Filter Modality:</span>
          </div>
          {(['All', 'Hybrid', 'Online', 'In-Person'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === mode
                  ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                  : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Events Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredEvents.map((evt: any) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-7 border border-[#D5BDAF]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
                    {evt.modality}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold">
                    ● {evt.status || 'Registration Open'}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] mb-3">
                  {evt.title}
                </h3>

                <div className="space-y-2 text-xs text-[#4A3E35] mb-5 bg-[#F5EBE0]/50 p-4 rounded-2xl border border-[#D5BDAF]/40">
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4 text-[#8C7769] shrink-0" />
                    <span className="font-medium">{evt.date}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-4 h-4 text-[#8C7769] shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <MapPin className="w-4 h-4 text-[#8C7769] shrink-0" />
                    <span className="text-[#6A5A4E]">{evt.venue}</span>
                  </div>
                  {evt.seats && (
                    <div className="flex items-center space-x-2.5 text-[#382F28] font-semibold">
                      <Users className="w-4 h-4 text-[#8C7769] shrink-0" />
                      <span>{evt.seats}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#6A5A4E] leading-relaxed mb-6">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDEDE9] space-y-2">
                <button
                  onClick={() => openBooking(`Workshop Registration: ${evt.title}`)}
                  className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md shadow-[#382F28]/15 transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D5BDAF]" />
                  <span>Reserve Workshop Seat</span>
                </button>

                <a
                  href={`https://wa.me/919848709677?text=${encodeURIComponent(`Hello Dr. Sampath Rani, I have an enquiry regarding ${evt.title}. Could you please share more details?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-all flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Masterclass Syllabus Table */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D5BDAF]/60 shadow-md">
          <h3 className="font-serif-luxury text-2xl font-bold text-[#261E18] mb-2">
            ESES Academy Certifications & Modality Overview
          </h3>
          <p className="text-xs text-[#7E6F64] mb-6">
            Comprehensive curriculum available in-person at Hyderabad center & internationally via Zoom.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D5BDAF] text-[#382F28] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Sl. No.</th>
                  <th className="py-3 px-4 font-bold">Certifications & Workshops</th>
                  <th className="py-3 px-4 font-bold">Format / Venue</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDE9] text-[#4A3E35]">
                {[
                  { num: '1', name: 'Law of Attraction workshops/courses at all levels', venue: 'In-Person & Online' },
                  { num: '2', name: 'Wealth and Law of Attraction workshops/courses at all levels', venue: 'In-Person & Online' },
                  { num: '3', name: 'Connect and Stay Aligned program', venue: 'In-Person & Online' },
                  { num: '4', name: 'The Secret Tunnel to Abundance program', venue: 'In-Person & Online' },
                  { num: '5', name: 'Kids & Teen Empowerment programs', venue: 'In-Person & Online' },
                  { num: '6', name: 'Meditation Programs, Chakra Healing & Meditation workshops', venue: 'In-Person & Online' },
                  { num: '7', name: 'Law of Attraction 1-on-1 Life Coaching Sessions', venue: 'In-Person & Online' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F5EBE0]/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#8C7769]">{row.num}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#261E18]">{row.name}</td>
                    <td className="py-3.5 px-4 text-[#7E6F64]">{row.venue}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openBooking(row.name)}
                        className="text-xs uppercase tracking-wider font-bold text-[#382F28] hover:text-[#8C7769]"
                      >
                        Enroll Now →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
