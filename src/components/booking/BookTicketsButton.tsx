'use client';

interface BookTicketsButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  label?: string;
  disabled?: boolean;
}

export function BookTicketsButton({
  onClick,
  fullWidth = false,
  label = 'Book Tickets',
  disabled = false,
}: BookTicketsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-[15px] font-bold px-8 py-3.5 rounded-xl shadow-lg transition-opacity duration-150 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : 'w-full sm:w-auto'
      }`}
      style={{
        background: 'var(--primary-blue)',
        color: 'var(--white)',
      }}
    >
      {label}
    </button>
  );
}
