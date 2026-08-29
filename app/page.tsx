'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/imageUtils';
import {
  Sparkles,
  ArrowRight,
  Phone,
  BookOpen,
  Calendar,
  CheckCircle2,
  Star,
  Play,
  Quote,
  ShieldCheck,
  Award,
  HeartHandshake,
  Compass,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import StatCounter from '@/components/StatCounter';
import VideoModal from '@/components/VideoModal';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent } from '@/lib/clientData';

export default function HomePage() {
  const [content, setContent] = useState<any>(defaultContent);

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

  const openVideo = (youtubeId: string, title?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-video-modal', { detail: { youtubeId, title } }));
    }
  };

  const hero = content?.hero || {
    badge: '✨ Holistic Life Coaching & Master Law of Attraction Trainer',
    title: 'Awaken Your Inner Power & Manifest the Life You Deserve',
    subtitle: 'Step into a profound journey of self-discovery, emotional liberation, and conscious abundance with Dr. Sampath Rani Momula.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Explore Programs',
    heroImage: '/images/welcome.jpg',
    stats: [
      { value: '1,247+', label: 'Personnel Mentored' },
      { value: '25+', label: 'Years Experience' },
      { value: '12+', label: 'Signature Workshops' },
      { value: '1,250+', label: 'Happy Clients' }
    ]
  };

  const about = content?.aboutIntro;
  const book = content?.book;
  const programs = content?.programs || [];
  const events = content?.events || [];
  const testimonials = content?.testimonials;

  return (
    <div className="relative overflow-hidden bg-[#FAF8F5]">
      <VideoModal />

      {/* Atmospheric glows */}
      <div className="bg-glow-taupe top-10 left-1/4 -translate-x-1/2" />
      <div className="bg-glow-sand top-96 right-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-8 bg-gradient-to-b from-[#F5EBE0]/60 via-[#EDEDE9]/40 to-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#B89986]" />
                <span>{hero.badge}</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-[#261E18] leading-[1.15]">
                {hero.title}
              </h1>

              <p className="text-[#6A5A4E] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => openBooking()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#FAF8F5] bg-[#382F28] hover:bg-[#261E18] shadow-lg shadow-[#382F28]/20 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#D5BDAF]" />
                  <span>{hero.primaryCta || 'Book A Call'}</span>
                </button>

                <Link
                  href="/programs"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#382F28] bg-[#FAF8F5] border border-[#D5BDAF] hover:bg-[#F5EBE0] transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>{hero.secondaryCta || 'Explore Programs'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Highlights badge */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                {(hero.credentials || ['Ph.D. Life Coach', 'Certified USA & UK', 'Amazon #1 Author']).map(
                  (cred: string, cIdx: number) => (
                    <div key={cIdx} className="flex items-center space-x-2 text-xs text-[#52443A]">
                      <CheckCircle2 className="w-4 h-4 text-[#8C7769] shrink-0" />
                      <span className="font-medium">{cred}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#D5BDAF]/60 via-[#E3D5CA]/50 to-[#D6CCC2]/60 blur-lg opacity-70" />

                <div className="relative bg-white/90 rounded-3xl overflow-hidden border border-[#D5BDAF] p-2.5 shadow-xl">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                    <Image
                      src={getImageUrl(hero.heroImage || '/images/welcome.jpg')}
                      alt="Dr. Sampath Rani Momula"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#261E18]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FAF8F5]/95 backdrop-blur-md rounded-xl border border-[#D5BDAF]/60 shadow-lg">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C7769] font-bold">
                        Founder & Master Coach
                      </div>
                      <div className="font-serif-luxury text-lg font-bold text-[#261E18]">
                        Dr. Sampath Rani Momula
                      </div>
                      <div className="text-[11px] text-[#6A5A4E]">
                        Ph.D. Holistic Life Coach • Author • Speaker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Counters Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20">
            {hero.stats?.map((stat: any, idx: number) => (
              <StatCounter key={idx} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT SUMMARY SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-8 bg-[#F5EBE0]/40 border-y border-[#D5BDAF]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1 rounded-3xl bg-[#D5BDAF]/30 blur-md" />
                <div className="relative bg-white rounded-3xl overflow-hidden border border-[#D5BDAF] p-2.5 shadow-lg">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EDEDE9]">
                    <Image
                      src={getImageUrl(about?.image || '/images/abt2.jpg')}
                      alt="Dr. Sampath Rani"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bio Information */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <SectionHeading
                badge={about?.badge || 'About Dr. Sampath Rani'}
                title={about?.title || 'Holistic Life Coach, Law of Attraction Trainer, Author & Speaker'}
                align="left"
                className="mb-6"
              />

              <p className="text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                {about?.paragraph1 ||
                  'Dr. Sampath Rani Momula is dedicated to helping individuals achieve mental, emotional, and physical peace through workshops, personalized coaching, healing remedies, and seminars.'}
              </p>

              <p className="text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                {about?.paragraph2 ||
                  'With over 25 years of multidisciplinary exploration across Metaphysical Sciences, Biomedical Sciences (UK), and Bach Flower Therapy, her compassionate guidance empowers you to reconnect with your inner wisdom.'}
              </p>

              {/* Quote Box */}
              {about?.quote && (
                <div className="rounded-2xl p-5 border-l-4 border-[#8C7769] bg-white border border-[#D5BDAF]/40 shadow-sm my-6">
                  <div className="flex items-start space-x-3">
                    <Quote className="w-6 h-6 text-[#8C7769] shrink-0 mt-1 opacity-80" />
                    <p className="font-serif-luxury italic text-[#261E18] text-sm sm:text-base leading-relaxed">
                      &quot;{about.quote}&quot;
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-white hover:bg-[#261E18] transition-all shadow-sm"
                >
                  <span>Read Official Biography</span>
                  <ArrowRight className="w-4 h-4 text-[#D5BDAF]" />
                </Link>
                <Link
                  href="/about#spiritual-journey"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-[#D5BDAF] bg-white text-[#382F28] hover:bg-[#F5EBE0] transition-all"
                >
                  <span>Spiritual Journey</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EMPOWERMENT PROGRAMS SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Empowerment Offerings"
            title="Signature Programs & Masterclasses"
            subtitle="Workshops, Certified Law of Attraction Courses, Meditation Sessions & 1-on-1 Life Coaching for love, peace, harmony & abundance in every area of your life."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 6).map((prog: any) => (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/50 shadow-sm hover:shadow-xl hover:border-[#8C7769] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Program Image Preview */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-[#EDEDE9] border border-[#D5BDAF]/30">
                    <Image
                      src={getImageUrl(prog.image || '/images/welcome.jpg')}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#261E18]/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#261E18] border border-[#D5BDAF]">
                      {prog.format?.split('(')[0] || 'In-Person & Online'}
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] mb-2 group-hover:text-[#8C7769] transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-[#8C7769] font-semibold mb-3">
                    {prog.tagline}
                  </p>

                  <p className="text-xs text-[#5A4D43] line-clamp-3 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  {/* Program Features */}
                  {prog.features && prog.features.length > 0 && (
                    <ul className="space-y-1.5 mb-6 border-t border-[#EDEDE9] pt-4">
                      {prog.features.slice(0, 2).map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start space-x-2 text-[11px] text-[#6A5A4E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7769] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-[#EDEDE9] flex items-center justify-between">
                  <button
                    onClick={() => openBooking(prog.title)}
                    className="text-xs uppercase tracking-wider font-bold text-[#382F28] hover:text-[#8C7769] flex items-center space-x-1"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/programs#${prog.id}`}
                    className="text-[11px] text-[#7E6F64] hover:text-[#261E18] underline underline-offset-4 font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] text-white hover:bg-[#261E18] shadow-md shadow-[#382F28]/15 transition-all"
            >
              <span>View All 7 Programs & Packages</span>
              <ArrowRight className="w-4 h-4 text-[#D5BDAF]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BEST-SELLER BOOK SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-8 bg-[#F5EBE0]/60 border-y border-[#D5BDAF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Book Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full bg-white border border-[#D5BDAF] text-[#382F28]">
                <Award className="w-4 h-4 text-[#8C7769]" />
                <span>{book?.badge || 'Amazon #1 Best Seller'}</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#261E18] leading-tight">
                {book?.title || 'The Doorway to Your Dreams'}
              </h2>

              <p className="text-base text-[#8C7769] font-medium font-serif-luxury italic">
                {book?.subtitle || 'Meditation to Manifestation'}
              </p>

              <p className="text-[#4A3E35] text-sm sm:text-base leading-relaxed">
                {book?.description ||
                  'This extensive book creates awareness of the harmonious components of Mind, Body, and Spirit. It explains how every individual is born intuitive and reveals how simple 10–15 minute daily meditation practices create the pathway to boundless happiness and prosperity.'}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                {book?.highlights?.map((hl: string, hIdx: number) => (
                  <div key={hIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#5A4D43]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C7769] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Buy Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={book?.amazonUrl || 'https://www.amazon.in/dp/9389024579?ref=myi_title_dp'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#FF9900] text-slate-950 hover:bg-[#ffaa2b] flex items-center space-x-2 shadow-md transition-transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={book?.flipkartUrl || 'https://www.flipkart.com/doorway-your-dreams/p/itm3a6e8b805437e'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#2874F0] text-white hover:bg-[#3b84fb] flex items-center space-x-2 shadow-md transition-transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy on Flipkart</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Book Cover 3D Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs group">
                <div className="absolute -inset-2 rounded-3xl bg-[#D5BDAF]/20 blur-xl group-hover:bg-[#D5BDAF]/30 transition-all duration-500" />
                <div className="relative bg-white rounded-3xl p-4 border border-[#D5BDAF] shadow-xl">
                  <Image
                    src={getImageUrl(book?.image || '/images/book.png')}
                    alt={book?.title || 'The Doorway to Your Dreams'}
                    width={380}
                    height={520}
                    className="w-full max-w-[280px] sm:max-w-[340px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="text-center pt-4">
                    <div className="flex items-center justify-center space-x-1 text-[#8C7769] text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#8C7769] text-[#8C7769]" />
                      ))}
                      <span className="text-[#261E18] font-bold ml-2">4.9 / 5.0</span>
                    </div>
                    <p className="text-[11px] text-[#7E6F64] mt-1 font-medium">
                      Over 10,000+ Readers Inspired Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WORKSHOPS & UPCOMING EVENTS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Live Interactive Sessions"
            title="Workshops & Masterclass Schedule"
            subtitle="Attend transformative sessions in-person in Hyderabad or join live from anywhere around the globe via Zoom."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((evt: any) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
                      {evt.modality}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold">
                      ● {evt.status}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-[#261E18] mb-2">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#52443A] bg-[#F5EBE0]/50 p-3.5 rounded-xl border border-[#D5BDAF]/30 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-[#8C7769]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#8C7769] font-bold">Time:</span>
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#8C7769] font-bold">Venue:</span>
                      <span className="text-[#6A5A4E]">{evt.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6A5A4E] line-clamp-2 mb-6">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDEDE9] flex items-center justify-between">
                  <button
                    onClick={() => openBooking(`Workshop Seat: ${evt.title}`)}
                    className="w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#261E18] border border-[#D5BDAF] transition-all text-center"
                  >
                    Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#382F28] hover:text-[#8C7769]"
            >
              <span>View Full Workshop Calendar & Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLIENT TESTIMONIALS & VIDEO REVIEWS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-8 bg-[#F5EBE0]/40 border-y border-[#D5BDAF]/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Real Transformations"
            title="What Our Clients & Mentors Say"
            subtitle="Explore honest experiences from software managers, psychologists, bank leaders, and spiritual mentors."
          />

          {/* Written Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials?.written?.slice(0, 3).map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/50 shadow-sm flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center space-x-1 text-[#B89986] mb-4">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B89986] text-[#B89986]" />
                    ))}
                  </div>

                  <p className="text-[#4A3E35] text-xs sm:text-sm leading-relaxed italic mb-6">
                    &quot;{item.review}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDEDE9]">
                  <div className="font-serif-luxury font-bold text-[#261E18] text-sm">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#8C7769] font-medium">
                    {item.designation}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Testimonials Highlight */}
          <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                  🎥 Video Testimonials & Life Stories
                </h3>
                <p className="text-xs text-[#7E6F64]">
                  Hear directly from graduates who transformed their health, career, and mindset.
                </p>
              </div>

              <Link
                href="/testimonials"
                className="text-xs uppercase tracking-wider font-bold text-[#382F28] hover:text-[#8C7769] flex items-center space-x-1"
              >
                <span>View All 10 Video Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials?.videos?.slice(0, 3).map((vid: any) => (
                <div
                  key={vid.id}
                  onClick={() => openVideo(vid.youtubeId, vid.title)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden border border-[#D5BDAF]/40 bg-[#EDEDE9] shadow-md"
                >
                  <div className="relative aspect-video">
                    {/* YouTube Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#261E18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#261E18] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white">
                    <span className="text-[10px] uppercase font-bold text-[#8C7769]">
                      {vid.tag}
                    </span>
                    <h4 className="text-xs font-semibold text-[#261E18] truncate mt-0.5">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center rounded-3xl p-10 sm:p-16 border border-[#D5BDAF] bg-white text-[#261E18] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
              <Sparkles className="w-4 h-4 text-[#8C7769]" />
              <span>Join Our Community Today</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#261E18] leading-tight">
              &quot;The Power Is Within You — Awaken It Today&quot;
            </h2>

            <p className="text-[#5A4D43] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Take the first step toward lasting peace, clarity, and unconditional abundance. It only takes a minute to book your initial consultation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#382F28] hover:bg-[#261E18] shadow-md shadow-[#382F28]/15 transition-all transform hover:scale-105"
              >
                Schedule Consultation Call
              </button>

              <a
                href="https://wa.me/919848709677"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider border border-[#D5BDAF] bg-[#FAF8F5] text-[#382F28] hover:bg-[#F5EBE0] transition-all text-center font-medium"
              >
                Quick WhatsApp Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
