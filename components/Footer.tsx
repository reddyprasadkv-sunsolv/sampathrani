'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImageUrl } from '@/lib/imageUtils';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  YouTubeIcon,
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  XTwitterIcon
} from '@/components/SocialIcons';

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const openBooking = (service?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service } }));
    }
  };

  return (
    <footer className="relative bg-[#F5EBE0]/70 border-t border-[#D5BDAF] pt-16 pb-12 text-[#4A3E35] overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D5BDAF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E3D5CA]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-12 mb-16 border border-[#D5BDAF] bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#382F28] font-bold px-3.5 py-1.5 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7769]" />
              <span>Begin Your Transformation</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18] mb-2">
              Ready to Align With Abundance & Inner Peace?
            </h3>
            <p className="text-[#6A5A4E] text-sm">
              Schedule your personalized 1-on-1 life coaching consultation or reserve your seat for the next Law of Attraction masterclass.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openBooking('Holistic Life Coaching')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-white hover:bg-[#261E18] shadow-md shadow-[#382F28]/15 transition-all transform hover:scale-105"
            >
              Book 1-on-1 Session
            </button>
            <Link
              href="/events"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border border-[#D5BDAF] bg-[#FAF8F5] text-[#382F28] hover:bg-[#F5EBE0] transition-all text-center"
            >
              Explore Workshops
            </Link>
          </div>
        </div>

        {/* Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D5BDAF]/40">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D5BDAF] p-1 bg-[#FAF8F5] shadow-sm">
                <Image
                  src={getImageUrl('/images/logo.png')}
                  alt="Dr. Sampath Rani"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-lg text-[#261E18]">Dr. Sampath Rani</h4>
                <p className="text-xs text-[#8C7769] font-medium">ESES Academy Founder</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#5A4D43]">
              Dr. Sampath Rani Momula is a Holistic Life Coach, Clinical Law of Attraction Teacher Trainer, and Best-Selling Author helping seekers across the globe achieve mental peace, emotional freedom, and conscious abundance.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://youtube.com/@sampathrani8003?si=YcUAYHEIDPVyuLY4"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#D5BDAF] hover:text-[#261E18] text-[#382F28] flex items-center justify-center transition-all border border-[#D5BDAF] shadow-sm"
                title="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sampath_rani"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#D5BDAF] hover:text-[#261E18] text-[#382F28] flex items-center justify-center transition-all border border-[#D5BDAF] shadow-sm"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/esesacademy"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#D5BDAF] hover:text-[#261E18] text-[#382F28] flex items-center justify-center transition-all border border-[#D5BDAF] shadow-sm"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/selfgrowth.in"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#D5BDAF] hover:text-[#261E18] text-[#382F28] flex items-center justify-center transition-all border border-[#D5BDAF] shadow-sm"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/MomulaRani"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#D5BDAF] hover:text-[#261E18] text-[#382F28] flex items-center justify-center transition-all border border-[#D5BDAF] shadow-sm"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-[#261E18] mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>About Dr. Sampath Rani</span>
                </Link>
              </li>
              <li>
                <Link href="/about#official-biography" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Official Biography</span>
                </Link>
              </li>
              <li>
                <Link href="/about#spiritual-journey" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Spiritual Journey (25 Years)</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Client Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Blog & Soul Videos</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Programs */}
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-[#261E18] mb-4 tracking-wide">
              Empowerment Programs
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/programs#holistic-life-coaching" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Holistic Life Coaching</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#law-of-attraction" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Law of Attraction Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#chakra-healing" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Chakra Healing & Balancing</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#connect-stay-aligned" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Connect & Stay Aligned</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#secret-tunnel-abundance" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Secret Tunnel to Abundance</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#kids-teen-empowerment" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Kids & Teen Empowerment</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#bach-flower-remedies" className="text-[#5A4D43] hover:text-[#261E18] transition-colors flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8C7769]" />
                  <span>Bach Flower Remedies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3.5 text-xs">
            <h4 className="font-serif-luxury text-base font-bold text-[#261E18] mb-4 tracking-wide">
              Contact & Location
            </h4>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#8C7769] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#261E18] font-semibold">Headquarters</span>
                <p className="text-[#5A4D43]">Hyderabad, Telangana, India</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[#261E18] font-semibold">WhatsApp Enquiry</span>
                <p>
                  <a
                    href="https://wa.me/919848709677?text=Hello%20Dr.%20Sampath%20Rani%2C%20I%20have%20an%20enquiry%20regarding%20your%20coaching%20sessions."
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:text-emerald-900 font-medium"
                  >
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-[#8C7769] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#261E18] font-semibold">Direct Email</span>
                <p>
                  <a href="mailto:sampathrani.lifecoach@gmail.com" className="text-[#5A4D43] hover:text-[#261E18] break-all">
                    sampathrani.lifecoach@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#8C7769] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#261E18] font-semibold">Consultation Hours</span>
                <p className="text-[#5A4D43]">Mon – Fri: 10:30 AM – 5:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright (Admin CMS Link Hidden) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E6F64] gap-4">
          <div>
            © {new Date().getFullYear()} Dr. Sampath Rani Momula. All Rights Reserved. • Designed & Developed by{' '}
            <span className="text-[#382F28] font-semibold">SunSolv Technologies</span>
          </div>

          <div className="text-[11px] text-[#8C7769]">
            Enriched Soul in Empowering Space (ESES Academy)
          </div>
        </div>
      </div>
    </footer>
  );
}
