'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/imageUtils';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Play,
  Video
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import VideoModal from '@/components/VideoModal';

export default function BlogPage() {
  const [content, setContent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const openVideo = (youtubeId: string, title?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-video-modal', { detail: { youtubeId, title } }));
    }
  };

  const blogs = content?.blogs || [];

  const categories = ['All', ...Array.from(new Set(blogs.map((b: any) => b.category || 'General')))];

  const filteredBlogs = blogs.filter((b: any) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <VideoModal />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Wisdom & Insights"
          title="Blog, Soul Videos & Reflections"
          subtitle="Illuminating articles, subconscious rewiring principles, and soul messages to elevate your consciousness every day."
        />

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                    : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7769] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-full py-2 pl-10 pr-4 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-[#D5BDAF]/60">
            <p className="text-[#7E6F64] text-sm">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog: any) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D5BDAF]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail / Video preview */}
                  <div className="relative aspect-[16/10] bg-[#EDEDE9] overflow-hidden">
                    {blog.youtubeId ? (
                      <div
                        onClick={() => openVideo(blog.youtubeId, blog.title)}
                        className="relative w-full h-full cursor-pointer"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${blog.youtubeId}/hqdefault.jpg`}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#261E18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-[#261E18] ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/80 text-[#FAF8F5] flex items-center space-x-1">
                          <Video className="w-3 h-3 text-[#D5BDAF]" />
                          <span>Video Article</span>
                        </div>
                      </div>
                    ) : (
                      <Link href={`/blog/${blog.slug}`} className="block relative w-full h-full">
                        <Image
                          src={getImageUrl(blog.image || '/images/abt3.jpg')}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    )}

                    <div className="absolute top-3 left-3 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#261E18] border border-[#D5BDAF]">
                      {blog.category || 'General'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-[11px] text-[#7E6F64] mb-2 font-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8C7769]" />
                        <span>{blog.date}</span>
                      </div>
                      {blog.readTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-[#8C7769]" />
                          <span>{blog.readTime}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif-luxury text-lg font-bold text-[#261E18] group-hover:text-[#8C7769] transition-colors mb-2 line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-[#5A4D43] line-clamp-3 leading-relaxed mb-4">
                      {blog.summary || blog.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#382F28] hover:text-[#8C7769]"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
