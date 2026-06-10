'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2.0;

export function SeatMap({
  seats,
  sectionSummary = [],
  hallName,
  selectedIds,
  onToggleSeat,
}: SeatMapProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [zoomDelta, setZoomDelta] = useState(0);

  // Track the hovered seat button's screen rect for fixed-position tooltip
  const [tooltipAnchor, setTooltipAnchor] = useState<DOMRect | null>(null);

  const bookableSeats = useMemo(() => getBookableSeats(seats), [seats]);
  const bounds = useMemo(() => computeCanvasBounds(seats), [seats]);
  const { viewportRef, scale: autoScale } = useHallViewportScale(
    bounds.width,
    bounds.height,
  );

  // Final scale = auto-fit + user adjustment, clamped to safe range
  const scale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, autoScale + zoomDelta));
  const finalWidth = Math.ceil(bounds.width * scale);
  const finalHeight = Math.ceil(bounds.height * scale);

  const canZoomIn = scale + ZOOM_STEP <= ZOOM_MAX + 0.001;
  const canZoomOut = scale - ZOOM_STEP >= ZOOM_MIN - 0.001;

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

  // Clear anchor when seat is un-hovered
  useEffect(() => {
    if (hoveredId === null) setTooltipAnchor(null);
  }, [hoveredId]);

  const handleHover = useCallback(
    (id: number | null, rect?: DOMRect) => {
      setHoveredId(id);
      setTooltipAnchor(id !== null && rect ? rect : null);
    },
    [],
  );

  // Wheel and pinch to zoom
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
        setZoomDelta((d) => {
          const newDelta = d + delta;
          return Math.max(ZOOM_MIN - autoScale, Math.min(ZOOM_MAX - autoScale, newDelta));
        });
      }
    };

    let initialDist = 0;
    let initialDelta = 0;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDist = getDistance(e.touches);
        setZoomDelta((d) => {
          initialDelta = d;
          return d;
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDist > 0) {
        e.preventDefault();
        const dist = getDistance(e.touches);
        const scaleChange = (dist / initialDist) - 1; // 0 if same, positive if zoomed in
        
        setZoomDelta(() => {
          const newDelta = initialDelta + scaleChange * 1.5; // multiplier for sensitivity
          return Math.max(ZOOM_MIN - autoScale, Math.min(ZOOM_MAX - autoScale, newDelta));
        });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDist = 0;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [autoScale]);

  const needsScrollHint = scale < 0.95 || bounds.width > 400;

  // Compute fixed tooltip position: centered above the hovered seat button
  const tooltipStyle = useMemo<React.CSSProperties | null>(() => {
    if (!tooltipAnchor) return null;
    const TOOLTIP_MARGIN = 10; // px gap between seat top and tooltip bottom
    return {
      position: 'fixed',
      left: tooltipAnchor.left + tooltipAnchor.width / 2,
      top: tooltipAnchor.top - TOOLTIP_MARGIN,
      transform: 'translate(-50%, -100%)',
      zIndex: 9999,
      pointerEvents: 'none',
    };
  }, [tooltipAnchor]);

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

      {/* ── Zoom Controls ── */}
      <div className="flex items-center gap-2 mb-3 self-end">
        <span className="text-[11px] font-semibold" style={{ color: 'var(--booking-text-muted)' }}>
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setZoomDelta((d) => Math.min(ZOOM_MAX - autoScale, d + ZOOM_STEP))}
          disabled={!canZoomIn}
          title="Zoom in"
          className="w-7 h-7 flex items-center justify-center rounded-md text-lg font-bold transition-opacity disabled:opacity-30 select-none"
          style={{
            background: 'var(--booking-surface-elevated)',
            border: '1px solid var(--booking-border)',
            color: 'var(--booking-text)',
          }}
        >
          +
        </button>
        <button
          onClick={() => setZoomDelta((d) => Math.max(ZOOM_MIN - autoScale, d - ZOOM_STEP))}
          disabled={!canZoomOut}
          title="Zoom out"
          className="w-7 h-7 flex items-center justify-center rounded-md text-lg font-bold transition-opacity disabled:opacity-30 select-none"
          style={{
            background: 'var(--booking-surface-elevated)',
            border: '1px solid var(--booking-border)',
            color: 'var(--booking-text)',
          }}
        >
          −
        </button>
        {zoomDelta !== 0 && (
          <button
            onClick={() => setZoomDelta(0)}
            title="Reset zoom"
            className="text-[11px] font-semibold px-2 py-0.5 rounded transition"
            style={{
              background: 'var(--booking-surface-elevated)',
              border: '1px solid var(--booking-border)',
              color: 'var(--booking-text-muted)',
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Scrollable viewport */}
      <div
        ref={viewportRef}
        className="hall-scroll-area w-full max-w-full rounded-2xl"
        style={{
          maxHeight: 'min(70vh, 560px)',
          minHeight: 'clamp(240px, 45vh, 400px)',
          border: '1px solid var(--booking-border)',
          background: 'var(--booking-bg)',
          touchAction: 'pan-x pan-y',
        }}
      >
        <div className="hall-scroll-inner flex min-h-full min-w-full items-start justify-center p-2 sm:p-3">
          <div
            className="relative shrink-0"
            style={{ width: finalWidth, height: finalHeight }}
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
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed-position tooltip (escapes overflow clipping) ── */}
      {hoveredSeat && hoveredSeat.status !== 'sold' && tooltipStyle &&
        createPortal(
          <div style={tooltipStyle}>
            <SeatTooltip
              seatName={hoveredSeat.seat_name}
              price={hoveredSeat.price}
              sectionLabel={hoveredSeat.section_label}
            />
          </div>,
          document.body,
        )
      }

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
