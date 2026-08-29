'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImageUrl } from '@/lib/imageUtils';
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Calendar,
  BookOpen,
  Award,
  HeartHandshake,
  MessageSquareHeart,
  Video,
  FileText
} from 'lucide-react';
import {
  YouTubeIcon,
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  XTwitterIcon
} from '@/components/SocialIcons';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [testimonialsDropdownOpen, setTestimonialsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setTestimonialsDropdownOpen(false);
  }, [pathname]);

  const openBooking = (service?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service } }));
    }
  };

  // Hide public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Utility Contact Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#D5BDAF]/40 text-xs text-[#5A4D43] py-2 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+919848709677"
              className="flex items-center space-x-2 text-[#261E18] hover:text-[#8C7769] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C7769]" />
              <span className="font-semibold">+91 984 870 9677</span>
            </a>
            <a
              href="mailto:sampathrani.lifecoach@gmail.com"
              className="flex items-center space-x-2 text-[#4A3E35] hover:text-[#261E18] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#8C7769]" />
              <span>sampathrani.lifecoach@gmail.com</span>
            </a>
            <div className="flex items-center space-x-2 text-[#7E6F64]">
              <Clock className="w-3.5 h-3.5 text-[#8C7769]" />
              <span>Mon - Fri 10:30 AM – 5:30 PM IST</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-[#7E6F64] uppercase tracking-wider font-semibold">Follow:</span>
            <div className="flex items-center space-x-2.5">
              <a
                href="https://youtube.com/@sampathrani8003?si=YcUAYHEIDPVyuLY4"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white hover:bg-[#D5BDAF] text-[#382F28] flex items-center justify-center border border-[#D5BDAF]/60 transition-all shadow-2xs"
                title="YouTube"
              >
                <YouTubeIcon className="w-3 h-3" />
              </a>
              <a
                href="https://www.instagram.com/sampath_rani"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white hover:bg-[#D5BDAF] text-[#382F28] flex items-center justify-center border border-[#D5BDAF]/60 transition-all shadow-2xs"
                title="Instagram"
              >
                <InstagramIcon className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/company/esesacademy"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white hover:bg-[#D5BDAF] text-[#382F28] flex items-center justify-center border border-[#D5BDAF]/60 transition-all shadow-2xs"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-3 h-3" />
              </a>
              <a
                href="https://www.facebook.com/selfgrowth.in"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white hover:bg-[#D5BDAF] text-[#382F28] flex items-center justify-center border border-[#D5BDAF]/60 transition-all shadow-2xs"
                title="Facebook"
              >
                <FacebookIcon className="w-3 h-3" />
              </a>
              <a
                href="https://x.com/MomulaRani"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white hover:bg-[#D5BDAF] text-[#382F28] flex items-center justify-center border border-[#D5BDAF]/60 transition-all shadow-2xs"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-md py-3 border-b border-[#D5BDAF]/50'
            : 'bg-white py-4 border-b border-[#D5BDAF]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center space-x-3.5 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#D5BDAF] p-0.5 bg-[#FAF8F5] group-hover:border-[#261E18] transition-all shadow-xs">
              <Image
                src={getImageUrl('/images/logo.png')}
                alt="Dr. Sampath Rani Momula"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#261E18] group-hover:text-[#8C7769] transition-colors leading-tight">
                Dr. Sampath Rani
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]/50">
                  ESES Academy
                </span>
                <span className="text-[11px] text-[#7E6F64] font-medium hidden sm:inline">
                  • Life Coach & Author
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-medium text-[14px]">
            {/* Home */}
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
                isActive('/')
                  ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                  : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
                  pathname.startsWith('/about')
                    ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                    : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="bg-white rounded-2xl p-2 shadow-xl border border-[#D5BDAF] space-y-1">
                    <Link
                      href="/about"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">About Dr. Sampath Rani</div>
                        <div className="text-[11px] text-[#7E6F64]">Overview, mission & philosophy</div>
                      </div>
                    </Link>

                    <Link
                      href="/about#official-biography"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">Official Biography</div>
                        <div className="text-[11px] text-[#7E6F64]">Academic & UK credentials</div>
                      </div>
                    </Link>

                    <Link
                      href="/about#spiritual-journey"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">Spiritual Journey</div>
                        <div className="text-[11px] text-[#7E6F64]">25 years of inner awakening</div>
                      </div>
                    </Link>

                    <Link
                      href="/about#past-work-life"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <HeartHandshake className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">Past Work Life</div>
                        <div className="text-[11px] text-[#7E6F64]">Science & education heritage</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Programs */}
            <Link
              href="/programs"
              className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
                isActive('/programs')
                  ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                  : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
              }`}
            >
              Programs
            </Link>

            {/* Workshops & Events */}
            <Link
              href="/events"
              className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
                isActive('/events')
                  ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                  : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
              }`}
            >
              Workshops
            </Link>

            {/* Testimonials Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTestimonialsDropdownOpen(true)}
              onMouseLeave={() => setTestimonialsDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
                  pathname.startsWith('/testimonials')
                    ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                    : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
                }`}
              >
                <span>Testimonials</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${testimonialsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {testimonialsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white rounded-2xl p-2 shadow-xl border border-[#D5BDAF] space-y-1">
                    <Link
                      href="/testimonials"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquareHeart className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">All Testimonials</div>
                        <div className="text-[11px] text-[#7E6F64]">Written client endorsements</div>
                      </div>
                    </Link>

                    <Link
                      href="/testimonials#video-testimonials"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <Video className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">Video Reviews</div>
                        <div className="text-[11px] text-[#7E6F64]">10 Client video stories</div>
                      </div>
                    </Link>

                    <Link
                      href="/testimonials#book-reviews"
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F5EBE0] text-[#382F28] flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4 text-[#8C7769]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#261E18]">Book Endorsements</div>
                        <div className="text-[11px] text-[#7E6F64]">Amazon #1 Best Seller feedback</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
                isActive('/blog')
                  ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                  : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
              }`}
            >
              Blog
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-[#382F28] text-white font-semibold shadow-xs'
                  : 'text-[#261E18] hover:text-[#8C7769] hover:bg-[#F5EBE0]/70'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-full text-white bg-[#382F28] hover:bg-[#261E18] border border-[#D5BDAF] shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D5BDAF]" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#261E18] hover:bg-[#F5EBE0] focus:outline-none border border-[#D5BDAF]/50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white/98 backdrop-blur-2xl">
          <div className="flex items-center justify-between p-4 border-b border-[#D5BDAF]/40 bg-[#FAF8F5]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D5BDAF] p-0.5 bg-white">
                <Image
                  src={getImageUrl('/images/logo.png')}
                  alt="Dr. Sampath Rani"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-[#261E18]">Dr. Sampath Rani</div>
                <div className="text-[10px] uppercase font-semibold text-[#8C7769]">ESES Academy</div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-[#4A3E35] hover:text-[#261E18] hover:bg-[#F5EBE0]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <Link
              href="/"
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl border ${
                isActive('/') ? 'bg-[#382F28] text-white border-[#382F28]' : 'text-[#261E18] border-transparent hover:bg-[#FAF8F5]'
              }`}
            >
              Home
            </Link>

            <div className="space-y-1 pt-1">
              <div className="text-[11px] uppercase tracking-wider text-[#7E6F64] font-bold px-4 mb-1">About</div>
              <div className="pl-3 space-y-1">
                <Link href="/about" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Overview & Philosophy
                </Link>
                <Link href="/about#official-biography" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Official Biography
                </Link>
                <Link href="/about#spiritual-journey" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Spiritual Journey (25 Years)
                </Link>
                <Link href="/about#past-work-life" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Past Work Life & Heritage
                </Link>
              </div>
            </div>

            <Link
              href="/programs"
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl border ${
                isActive('/programs') ? 'bg-[#382F28] text-white border-[#382F28]' : 'text-[#261E18] border-transparent hover:bg-[#FAF8F5]'
              }`}
            >
              Programs (7 Signature Offerings)
            </Link>

            <Link
              href="/events"
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl border ${
                isActive('/events') ? 'bg-[#382F28] text-white border-[#382F28]' : 'text-[#261E18] border-transparent hover:bg-[#FAF8F5]'
              }`}
            >
              Workshops & Events
            </Link>

            <div className="space-y-1 pt-1">
              <div className="text-[11px] uppercase tracking-wider text-[#7E6F64] font-bold px-4 mb-1">Testimonials</div>
              <div className="pl-3 space-y-1">
                <Link href="/testimonials" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  All Client Reviews
                </Link>
                <Link href="/testimonials#video-testimonials" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Workshop Video Testimonials
                </Link>
                <Link href="/testimonials#book-reviews" className="block text-sm py-2 px-3 rounded-lg text-[#4A3E35] hover:bg-[#F5EBE0] font-medium">
                  Amazon Book Reviews
                </Link>
              </div>
            </div>

            <Link
              href="/blog"
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl border ${
                isActive('/blog') ? 'bg-[#382F28] text-white border-[#382F28]' : 'text-[#261E18] border-transparent hover:bg-[#FAF8F5]'
              }`}
            >
              Blog & Soul Videos
            </Link>

            <Link
              href="/contact"
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl border ${
                isActive('/contact') ? 'bg-[#382F28] text-white border-[#382F28]' : 'text-[#261E18] border-transparent hover:bg-[#FAF8F5]'
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-white flex items-center justify-center space-x-2 shadow-md hover:bg-[#261E18]"
              >
                <Sparkles className="w-4 h-4 text-[#D5BDAF]" />
                <span>Book A Consultation</span>
              </button>

              <div className="text-xs text-center text-[#7E6F64] pt-2">
                +91 984 870 9677 • Hyderabad, India
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
