'use client';

interface ShowTimeSelectorProps {
  timings: string[];
  selectedTiming: string | null;
  onSelect: (timing: string) => void;
}

export function ShowTimeSelector({ timings, selectedTiming, onSelect }: ShowTimeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-bold" style={{ color: 'var(--booking-text)' }}>
        Select Show Time
      </h3>
      <div className="flex flex-wrap gap-3">
        {timings.map((timing) => {
          const isActive = selectedTiming === timing;
          return (
            <button
              key={timing}
              type="button"
              onClick={() => onSelect(timing)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 hover:opacity-90"
              style={{
                background: isActive ? 'var(--primary-blue)' : 'var(--booking-surface-elevated)',
                color: isActive ? 'var(--white)' : 'var(--booking-text)',
                border: `1.5px solid ${isActive ? 'var(--primary-blue)' : 'var(--booking-border)'}`,
              }}
            >
              {timing}
            </button>
          );
        })}
      </div>
    </div>
  );
}
