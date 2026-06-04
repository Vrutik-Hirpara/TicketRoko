import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDateRangePickerProps {
  initialStart: string;
  initialEnd: string;
  onApply: (start: string, end: string) => void;
  onCancel: () => void;
}

export const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  initialStart,
  initialEnd,
  onApply,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<string>(initialStart);
  const [endDate, setEndDate] = useState<string>(initialEnd);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    initialStart ? new Date(initialStart) : new Date()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(year, month, i));
    }
    return calendarDays;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isPastDate = (d: Date) => {
    const compare = new Date(d);
    compare.setHours(0, 0, 0, 0);
    return compare < today;
  };

  const handleDateClick = (d: Date) => {
    if (isPastDate(d)) return;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    if (activeTab === 'start') {
      setStartDate(dateStr);
      if (endDate && dateStr > endDate) {
        setEndDate('');
      }
      setActiveTab('end');
    } else {
      if (startDate && dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate('');
        return;
      }
      setEndDate(dateStr);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="absolute top-full mt-2 left-0 w-full sm:w-[320px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'start'
              ? 'text-[var(--primary-blue)] border-b-2 border-[var(--primary-blue)]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setActiveTab('start')}
        >
          Start Date
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'end'
              ? 'text-[var(--primary-blue)] border-b-2 border-[var(--primary-blue)]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setActiveTab('end')}
        >
          End Date
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="font-bold text-gray-800 text-[15px]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-7 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-xs font-semibold text-gray-500 py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {days.map((d, i) => {
            if (!d) return <div key={i} className="h-8"></div>;

            const isPast = isPastDate(d);

            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            const isStart = startDate === dateStr;
            const isEnd = endDate === dateStr;
            const isBetween =
              startDate && endDate && dateStr > startDate && dateStr < endDate;
            const isSameDay = startDate === endDate;

            let wrapperClass = 'relative flex items-center justify-center h-8 w-full';
            if (isBetween) wrapperClass += ' bg-blue-50';
            if (isStart && endDate && !isSameDay)
              wrapperClass += ' before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1/2 before:bg-blue-50';
            if (isEnd && startDate && !isSameDay)
              wrapperClass += ' before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1/2 before:bg-blue-50';

            let bgClass = '';
            let textClass = 'text-gray-800 hover:bg-gray-100';

            if (isPast) {
              textClass = 'text-gray-300 cursor-not-allowed hover:bg-transparent';
            } else if (isStart || isEnd) {
              bgClass = 'bg-[var(--primary-blue)]';
              textClass = 'text-white font-semibold hover:bg-[var(--primary-blue)]';
            } else if (isBetween) {
              textClass = 'text-[var(--primary-blue)] hover:bg-blue-100';
            }

            return (
              <div key={i} className={wrapperClass}>
                <button
                  disabled={isPast}
                  onClick={() => handleDateClick(d)}
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full text-sm z-10 transition-colors ${bgClass} ${textClass}`}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex gap-2">
          <button
            className="px-4 py-1.5 border border-gray-200 text-[var(--primary-blue)] rounded hover:bg-gray-50 text-sm font-medium transition-colors bg-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1.5 border border-gray-200 text-[var(--primary-blue)] rounded hover:bg-gray-50 text-sm font-medium transition-colors bg-white"
            onClick={() => {
              setStartDate('');
              setEndDate('');
              setActiveTab('start');
            }}
          >
            Clear
          </button>
        </div>
        <button
          className="px-5 py-1.5 bg-[var(--primary-blue)] text-white rounded hover:opacity-90 text-sm font-medium transition-opacity disabled:opacity-50"
          onClick={() => onApply(startDate, endDate)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
