'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Phone, Mail, User, Calendar, MessageSquare, Video } from 'lucide-react';
import CaptchaWidget from '@/components/CaptchaWidget';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
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
    const handleOpen = (e: any) => {
      if (e.detail?.service) {
        setFormData((prev) => ({ ...prev, service: e.detail.service }));
      }
      setIsOpen(true);
      setSuccess(false);
      setError('');
      setCaptchaVerified(false);
    };

    window.addEventListener('open-booking-modal', handleOpen);
    return () => window.removeEventListener('open-booking-modal', handleOpen);
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
        setError(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch (err: any) {
      setError('A connection error occurred. Please try again or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] bg-[#FAF8F5] shadow-2xl my-8 text-[#4A3E35]">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5EBE0] hover:bg-[#E3D5CA] text-[#4A3E35] hover:text-[#261E18] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#261E18]">
              Consultation Request Received!
            </h3>
            <p className="text-[#6A5A4E] text-sm max-w-md mx-auto">
              Thank you for reaching out to Dr. Sampath Rani Momula. Our team will review your preferred date and contact you on WhatsApp / Phone shortly to confirm your session.
            </p>
            <div className="pt-4 flex justify-center space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-[#FAF8F5] hover:bg-[#261E18]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center sm:text-left">
              <div className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-[#382F28] font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B89986]" />
                <span>Private Consultation & Workshops</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
                Book Your Transformation Session
              </h3>
              <p className="text-[#7E6F64] text-xs mt-1">
                Fill in your details below to schedule your 1-on-1 coaching or enroll in an upcoming program.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
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
                      className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Program / Service *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 px-3 text-xs text-[#261E18] focus:outline-none"
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
                {/* Preferred Mode */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Consultation Mode
                  </label>
                  <div className="relative">
                    <Video className="w-4 h-4 text-[#8E7E73] absolute left-3 top-3" />
                    <select
                      name="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] focus:outline-none"
                    >
                      <option value="Zoom Video Consultation">Zoom Video Consultation</option>
                      <option value="Telephonic Consultation">Telephonic Consultation</option>
                      <option value="In-Person (Hyderabad Studio)">In-Person (Hyderabad Studio)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
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
                      className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#261E18] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Your Goals / Brief Message *
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you'd like to achieve (e.g. stress relief, career breakthrough, manifestation goals)..."
                    className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-3 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
                  />
                </div>
              </div>

              {/* Captcha Verification Widget */}
              <CaptchaWidget onVerify={(isValid) => setCaptchaVerified(isValid)} />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-lg shadow-[#382F28]/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D5BDAF]" />
                    <span>Confirm & Schedule Consultation</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <a
                  href="https://wa.me/919848709677?text=Hello%20Dr.%20Sampath%20Rani%2C%20I%20have%20an%20enquiry%20regarding%20consultations%20and%20workshops."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>For Immediate Enquiries: Chat on WhatsApp</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-[#8E7E73]">
                🔒 Your privacy is 100% sacred. We never share your personal information.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
