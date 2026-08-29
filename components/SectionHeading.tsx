import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}: SectionHeadingProps) {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignmentClass} mb-12 sm:mb-16 ${className}`}>
      {badge && (
        <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full bg-[#F5EBE0] border border-[#D5BDAF] text-[#382F28] mb-3.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B89986]" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#261E18] leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#6A5A4E] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D5BDAF] to-transparent mt-5" />
    </div>
  );
}
