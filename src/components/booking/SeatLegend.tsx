'use client';

import type { SectionSummary } from '../../types/booking';

const BASE_LEGEND = [
  { key: 'available', label: 'Available', colorVar: '--seat-available-fill' },
  { key: 'selected', label: 'Selected', colorVar: '--seat-selected' },
  { key: 'sold', label: 'Sold', colorVar: '--seat-sold-border' },
] as const;

interface SeatLegendProps {
  sectionSummary?: SectionSummary[];
}

export function SeatLegend({ sectionSummary = [] }: SeatLegendProps) {
  const premiumSections = sectionSummary.filter((s) => s.fill);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4 px-4 rounded-xl mt-6 w-full max-w-2xl"
      style={{
        background: 'var(--booking-surface)',
        border: '1px solid var(--booking-border)',
      }}
    >
      {BASE_LEGEND.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-md flex-shrink-0 border-2"
            style={{
              background:
                item.key === 'available'
                  ? `color-mix(in srgb, var(${item.colorVar}) 22%, transparent)`
                  : item.key === 'sold'
                    ? 'var(--seat-sold-fill)'
                    : `var(${item.colorVar})`,
              borderColor: `var(${item.colorVar})`,
            }}
          />
          <span className="text-xs font-medium" style={{ color: 'var(--booking-text-muted)' }}>
            {item.label}
          </span>
        </div>
      ))}

      {premiumSections.length > 0 && (
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-md flex-shrink-0 border-2"
            style={{
              borderColor: 'var(--seat-available-fill)',
              background: 'color-mix(in srgb, var(--seat-available-fill) 22%, transparent)',
            }}
          />
          <span className="text-xs font-medium" style={{ color: 'var(--booking-text-muted)' }}>
            Premium (section color)
          </span>
        </div>
      )}
    </div>
  );
}
