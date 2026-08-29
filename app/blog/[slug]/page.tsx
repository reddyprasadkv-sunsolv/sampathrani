import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  BookOpen,
  Phone,
  Play
} from 'lucide-react';
import { getSiteContent } from '@/lib/contentStore';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const content = getSiteContent();
  const blog = content?.blogs?.find((b: any) => b.slug === slug);

  if (!blog) {
    return { title: 'Article Not Found | Dr. Sampath Rani' };
  }

  return {
    title: `${blog.title} | Dr. Sampath Rani Momula`,
    description: blog.summary || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [blog.image || '/images/abt3.jpg']
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const content = getSiteContent();
  const blog = content?.blogs?.find((b: any) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = content?.blogs
    ?.filter((b: any) => b.slug !== slug)
    ?.slice(0, 2);

  return (
    <div className="py-16 md:py-24 px-4 sm:px-8 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#382F28] hover:text-[#8C7769] mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-[#8C7769]" />
          <span>Back to All Articles & Videos</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="inline-block text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28]">
            {blog.category || 'Soul Video & Wisdom'}
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#261E18] leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#7E6F64] border-y border-[#EDEDE9] py-3 font-medium">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#8C7769]" />
              <span>Published: {blog.date}</span>
            </div>
            {blog.readTime && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-[#8C7769]" />
                <span>{blog.readTime}</span>
              </div>
            )}
            <div className="text-[#382F28] font-semibold">By Dr. Sampath Rani Momula</div>
          </div>
        </div>

        {/* Media (YouTube video embed or Image) */}
        {blog.youtubeId ? (
          <div className="rounded-3xl overflow-hidden border border-[#D5BDAF] mb-10 shadow-xl aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${blog.youtubeId}?rel=0`}
              title={blog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          blog.image && (
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[#D5BDAF] mb-10 shadow-xl bg-[#EDEDE9]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )
        )}

        {/* Article Body Content */}
        <article className="max-w-none space-y-6 text-[#4A3E35] text-base sm:text-lg leading-relaxed font-normal">
          {blog.content.split('\n\n').map((paragraph: string, pIdx: number) => (
            <p key={pIdx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Author Bio Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-md mt-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D5BDAF] shrink-0 relative bg-[#EDEDE9]">
            <Image
              src="/images/welcome.jpg"
              alt="Dr. Sampath Rani"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-[#261E18]">
              Dr. Sampath Rani Momula
            </h4>
            <p className="text-xs text-[#8C7769] font-semibold">
              Ph.D. Holistic Life Coach • Clinical Law of Attraction Trainer • Author
            </p>
            <p className="text-xs text-[#6A5A4E] mt-2">
              Guiding individuals worldwide to discover self-healing, emotional peace, and conscious manifestation through ESES Academy.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#EDEDE9]">
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] mb-6">
              Read Next
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-[#D5BDAF]/50 hover:border-[#8C7769] shadow-sm hover:shadow-md block group transition-all"
                >
                  <span className="text-[10px] uppercase font-bold text-[#8C7769]">
                    {rel.category}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-[#261E18] text-sm group-hover:text-[#8C7769] transition-colors mt-1 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6A5A4E] mt-2 line-clamp-2">
                    {rel.summary || rel.content}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
