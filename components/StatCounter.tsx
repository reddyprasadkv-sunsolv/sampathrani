import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

export default function StatCounter({ value, label }: StatItemProps) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 text-center border border-[#D5BDAF]/40 bg-white/80 shadow-sm">
      <div className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-[#261E18] mb-1.5">
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-[#7E6F64] font-bold">
        {label}
      </div>
    </div>
  );
}
