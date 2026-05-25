'use client';

import { ReactNode } from 'react';

interface EventDetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function EventDetailRow({ icon, label, value }: EventDetailRowProps) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-200 hover:bg-white/[0.03]"
      style={{ border: '1px solid var(--booking-border)' }}
    >
      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-blue)' }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
          style={{ color: 'var(--booking-text-muted)' }}
        >
          {label}
        </p>
        <p className="text-[14px] font-medium break-words" style={{ color: 'var(--booking-text)' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
