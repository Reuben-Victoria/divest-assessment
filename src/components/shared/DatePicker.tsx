'use client';
import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  label?: string;
  defaultValue?: Date;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label = "Issue Date",
  defaultValue = new Date(2021, 7, 21),
  disabled = false,
  fullWidth = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue);
  const [currentMonth, setCurrentMonth] = useState<Date>(defaultValue);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setIsOpen(false);
    if (onChange) {
      onChange(newDate);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days.map((day, index) => {
      if (day === null) {
        return (
          <div
            key={`empty-${index}`}
            className="datepicker__day datepicker__day--empty"
          ></div>
        );
      }

      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      return (
        <button
          key={day}
          type="button"
          className={`datepicker__day ${
            isSelected ? "datepicker__day--selected" : ""
          }`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </button>
      );
    });
  };

  return (
    <div
      className={`datepicker ${fullWidth ? "datepicker--fullWidth" : ""} ${
        disabled ? "datepicker--disabled" : ""
      }`}
      ref={datePickerRef}
    >
      {label && <label className="datepicker__label">{label}</label>}

      <button
        type="button"
        className={`datepicker__input ${
          isOpen ? "datepicker__input--active" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="datepicker__input-text">
          {formatDate(selectedDate)}
        </span>
        <svg
          className="datepicker__input-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H13V1C13 0.734784 12.8946 0.48043 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V2H5V1C5 0.734784 4.89464 0.48043 4.70711 0.292893C4.51957 0.105357 4.26522 0 4 0C3.73478 0 3.48043 0.105357 3.29289 0.292893C3.10536 0.48043 3 0.734784 3 1V2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2ZM14 14H2V7H14V14Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="datepicker__calendar">
          <div className="datepicker__header">
            <button
              type="button"
              className="datepicker__nav datepicker__nav--prev"
              onClick={handlePrevMonth}
            >
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div className="datepicker__month">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              type="button"
              className="datepicker__nav datepicker__nav--next"
              onClick={handleNextMonth}
            >
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="datepicker__grid">{renderCalendar()}</div>
        </div>
      )}
    </div>
  );
};
export default DatePicker;
