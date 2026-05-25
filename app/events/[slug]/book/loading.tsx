export default function BookLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: 'var(--booking-bg)' }}
    >
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--primary-blue)' }}
      />
      <p className="text-sm" style={{ color: 'var(--booking-text-muted)' }}>
        Loading booking…
      </p>
    </div>
  );
}
