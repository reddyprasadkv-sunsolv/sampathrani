'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppConcierge() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const defaultMessage = encodeURIComponent(
    'Hello Dr. Sampath Rani, I visited your website and would like to know more about your life coaching and workshops.'
  );

  const whatsappUrl = `https://wa.me/919848709677?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {showTooltip && (
        <div className="text-xs text-[#261E18] py-2 px-3.5 rounded-2xl rounded-br-none mb-2 shadow-lg border border-[#D5BDAF] flex items-center space-x-2 bg-[#FAF8F5] animate-bounce">
          <span className="font-medium">✨ Need guidance? Chat with Dr. Sampath Rani</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#7E6F64] hover:text-[#261E18]"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat with Dr. Sampath Rani on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}
