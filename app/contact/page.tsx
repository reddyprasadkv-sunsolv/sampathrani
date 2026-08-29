'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  User,
  Calendar,
  MessageSquare,
  Video,
  Send,
  MessageCircle
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CaptchaWidget from '@/components/CaptchaWidget';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent } from '@/lib/clientData';

export default function ContactPage() {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Holistic Life Coaching (1-on-1)',
    preferredMode: 'Zoom Video Consultation',
    preferredDate: '',
    message: ''
  });

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      setError('Please solve the security verification captcha correctly before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Holistic Life Coaching (1-on-1)',
          preferredMode: 'Zoom Video Consultation',
          preferredDate: '',
          message: ''
        });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setError('A connection error occurred. Please try again or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const settings = content?.siteSettings;

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Get in Touch"
          title="Contact & Schedule Consultation"
          subtitle="Reach out to Dr. Sampath Rani Momula for personalized 1-on-1 coaching, corporate empowerment keynotes, or workshop admissions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-md space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#261E18]">
                Direct Contact Information
              </h3>
              <p className="text-xs text-[#7E6F64]">
                We respond promptly to all consultation inquiries and workshop registrations.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${settings?.phoneRaw || '+919848709677'}`}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] transition-colors group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#261E18] group-hover:text-[#8C7769] transition-colors">
                      Phone & Call
                    </div>
                    <div className="text-xs text-[#7E6F64]">
                      {settings?.phone || '+91 984 870 9677'}
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919848709677?text=Hello%20Dr.%20Sampath%20Rani%2C%20I%20would%20like%20to%20inquire%20about%20your%20coaching%20sessions."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100/70 transition-colors group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900 group-hover:text-emerald-950 transition-colors">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-xs text-emerald-800">
                      +91 984 870 9677 (Instant Response)
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings?.email || 'sampathrani.lifecoach@gmail.com'}`}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] transition-colors group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#261E18] group-hover:text-[#8C7769] transition-colors">
                      Direct Email
                    </div>
                    <div className="text-xs text-[#7E6F64] break-all">
                      {settings?.email || 'sampathrani.lifecoach@gmail.com'}
                    </div>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#261E18]">
                      Center Headquarters
                    </div>
                    <div className="text-xs text-[#7E6F64]">
                      {settings?.address || 'Hyderabad, Telangana, India'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#261E18]">
                      Consultation Timings
                    </div>
                    <div className="text-xs text-[#7E6F64]">
                      {settings?.workingHours || 'Mon – Fri: 10:30 AM – 5:30 PM IST'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D5BDAF]/60 shadow-lg space-y-6">
              <div className="space-y-2 border-b border-[#EDEDE9] pb-4">
                <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C7769]" />
                  <span>Send Inquiries Directly</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
                  Consultation Booking Form
                </h3>
                <p className="text-xs text-[#7E6F64]">
                  Reserve a personalized life coaching session or register for upcoming masterclasses.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#261E18]">
                    Inquiry Successfully Received!
                  </h4>
                  <p className="text-xs text-[#7E6F64] max-w-md mx-auto">
                    Thank you for connecting with Dr. Sampath Rani Momula. We will review your request and get back to you via WhatsApp or phone call shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-white hover:bg-[#261E18]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Priya Reddy"
                          className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98487 09677"
                          className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Select Program / Service *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 px-3 text-xs text-[#261E18] focus:outline-none"
                      >
                        <option value="Holistic Life Coaching (1-on-1)">Holistic Life Coaching (1-on-1)</option>
                        <option value="All Levels of Law of Attraction">All Levels of Law of Attraction</option>
                        <option value="Chakra Healing & Balancing Meditation">Chakra Healing & Balancing Meditation</option>
                        <option value="Connect and Stay Aligned Workshop">Connect and Stay Aligned Workshop</option>
                        <option value="The Secret Tunnel to Abundance">The Secret Tunnel to Abundance</option>
                        <option value="Kids & Teen Empowerment Program">Kids & Teen Empowerment Program</option>
                        <option value="Bach Flower Remedy Consultation">Bach Flower Remedy Consultation</option>
                        <option value="Workshop & Event Seat Booking">Workshop & Event Seat Booking</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Preferred Mode
                      </label>
                      <div className="relative">
                        <Video className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                        <select
                          name="preferredMode"
                          value={formData.preferredMode}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] focus:outline-none"
                        >
                          <option value="Zoom Video Consultation">Zoom Video Consultation</option>
                          <option value="Telephonic Consultation">Telephonic Consultation</option>
                          <option value="In-Person (Hyderabad Studio)">In-Person (Hyderabad Studio)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                      Your Goals / Question *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share what brings you to Dr. Sampath Rani (e.g., career growth, emotional healing, family harmony)..."
                      className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                    />
                  </div>

                  {/* Captcha Verification Widget */}
                  <CaptchaWidget onVerify={(isValid) => setCaptchaVerified(isValid)} />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-lg shadow-[#382F28]/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#D5BDAF]" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
