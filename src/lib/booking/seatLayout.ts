import type { SeatData } from '../../types/booking';

export interface SectionLayout {
  label: string;
  rows: RowLayout[];
  maxX: number;
}

export interface RowLayout {
  rowLabel: string;
  seats: SeatData[];
  maxX: number;
}

export function groupSeatsBySection(seats: SeatData[]): SectionLayout[] {
  const sectionMap = new Map<string, Map<string, SeatData[]>>();

  for (const seat of seats) {
    if (!sectionMap.has(seat.section_label)) {
      sectionMap.set(seat.section_label, new Map());
    }
    const rowMap = sectionMap.get(seat.section_label)!;
    if (!rowMap.has(seat.row_label)) {
      rowMap.set(seat.row_label, []);
    }
    rowMap.get(seat.row_label)!.push(seat);
  }

  const sectionOrder = ['Platinum', 'Gold', 'Silver'];

  return Array.from(sectionMap.entries())
    .sort(([a], [b]) => {
      const ai = sectionOrder.indexOf(a);
      const bi = sectionOrder.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map(([label, rowMap]) => {
      const rows = Array.from(rowMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([rowLabel, rowSeats]) => {
          const sorted = [...rowSeats].sort((a, b) => a.x_pos - b.x_pos);
          const maxX = Math.max(...sorted.map((s) => s.x_pos));
          return { rowLabel, seats: sorted, maxX };
        });

      const maxX = Math.max(...rows.map((r) => r.maxX), 1);
      return { label, rows, maxX };
    });
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
