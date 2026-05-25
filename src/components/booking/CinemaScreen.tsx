'use client';

export function CinemaScreen() {
  return (
    <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
      <div className="relative w-[72%] sm:w-[65%] max-w-md">
        <div
          className="h-3 sm:h-4 rounded-t-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, var(--screen-glow) 0%, transparent 100%)',
            boxShadow: '0 -8px 30px var(--screen-glow)',
          }}
        />
      </div>
      <p
        className="mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: 'var(--booking-text-muted)' }}
      >
        Screen this way
      </p>
    </div>
  );
}
