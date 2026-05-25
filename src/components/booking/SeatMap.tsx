'use client';

import { useCallback, useMemo, useState } from 'react';
import type { SeatData, SectionSummary } from '../../types/booking';
import {
  computeCanvasBounds,
  getBookableSeats,
  getSeatPosition,
  getSectionLabelPositions,
  SEAT_SIZE,
} from '../../lib/booking/seatMapper';
import { getSeatStyle, resolveVisualState } from '../../lib/booking/seatStyles';
import { useHallViewportScale } from '../../hooks/useHallViewportScale';
import { CinemaScreen } from './CinemaScreen';
import { Seat } from './Seat';
import { SeatLegend } from './SeatLegend';
import { SeatTooltip } from './SeatTooltip';

interface SeatMapProps {
  seats: SeatData[];
  sectionSummary?: SectionSummary[];
  hallName?: string;
  selectedIds: Set<number>;
  onToggleSeat: (seat: SeatData) => void;
}

export function SeatMap({
  seats,
  sectionSummary = [],
  hallName,
  selectedIds,
  onToggleSeat,
}: SeatMapProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const bookableSeats = useMemo(() => getBookableSeats(seats), [seats]);
  const bounds = useMemo(() => computeCanvasBounds(seats), [seats]);
  const { viewportRef, scale, scaledWidth, scaledHeight } = useHallViewportScale(
    bounds.width,
    bounds.height,
  );

  const sectionLabels = useMemo(
    () => getSectionLabelPositions(seats, sectionSummary),
    [seats, sectionSummary],
  );

  const seatNodes = useMemo(
    () =>
      bookableSeats.map((seat) => {
        const pos = getSeatPosition(seat, bounds);
        const selected = selectedIds.has(seat.id);
        const visualState = resolveVisualState(seat, selected);
        return {
          seat,
          left: pos.left,
          top: pos.top,
          visualState,
          style: getSeatStyle(visualState, seat.fill),
        };
      }),
    [bookableSeats, bounds, selectedIds],
  );

  const hoveredSeat = useMemo(
    () => bookableSeats.find((s) => s.id === hoveredId) ?? null,
    [bookableSeats, hoveredId],
  );

  const handleHover = useCallback((id: number | null) => setHoveredId(id), []);

  const needsScrollHint = scale < 0.95 || bounds.width > 400;

  return (
    <div className="w-full min-w-0 flex flex-col items-center">
      <CinemaScreen />

      {hallName && (
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3 -mt-1"
          style={{ color: 'var(--booking-text-muted)' }}
        >
          {hallName}
        </p>
      )}

      {/* Scrollable viewport — hall never clipped */}
      <div
        ref={viewportRef}
        className="hall-scroll-area w-full max-w-full rounded-2xl"
        style={{
          maxHeight: 'min(70vh, 560px)',
          minHeight: 'clamp(240px, 45vh, 400px)',
          border: '1px solid var(--booking-border)',
          background: 'var(--booking-bg)',
        }}
      >
        <div className="hall-scroll-inner flex min-h-full min-w-full items-start justify-center p-2 sm:p-3">
          <div
            className="relative shrink-0"
            style={{
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            <div
              className="absolute top-0 left-0 booking-dot-grid rounded-xl"
              style={{
                width: bounds.width,
                height: bounds.height,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              {sectionLabels.map((section) => (
                <span
                  key={section.label}
                  className="absolute text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap -translate-x-1/2 pointer-events-none z-10"
                  style={{
                    left: section.x - bounds.minX + SEAT_SIZE / 2,
                    top: section.y - bounds.minY,
                    color: section.fill,
                  }}
                >
                  {section.label}
                </span>
              ))}

              {seatNodes.map(({ seat, left, top, visualState, style }) => (
                <Seat
                  key={seat.id}
                  seat={seat}
                  visualState={visualState}
                  left={left}
                  top={top}
                  style={style}
                  onToggle={onToggleSeat}
                  onHover={handleHover}
                />
              ))}

              {hoveredSeat && hoveredSeat.status !== 'sold' && (
                <div
                  className="absolute z-50 pointer-events-none"
                  style={{
                    left: hoveredSeat.x_pos - bounds.minX + SEAT_SIZE / 2,
                    top: hoveredSeat.y_pos - bounds.minY - 8,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <SeatTooltip
                    seatName={hoveredSeat.seat_name}
                    price={hoveredSeat.price}
                    sectionLabel={hoveredSeat.section_label}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {needsScrollHint && (
        <p
          className="text-[11px] mt-2 text-center w-full"
          style={{ color: 'var(--booking-text-muted)' }}
        >
          Scroll or drag to explore the full hall layout
        </p>
      )}

      <SeatLegend sectionSummary={sectionSummary} />
    </div>
  );
}
