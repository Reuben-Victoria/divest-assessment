import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export interface UseDatePickerProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export const useDatePicker = ({
  defaultValue = new Date(),
  onChange,
}: UseDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue);
  const [currentMonth, setCurrentMonth] = useState<Date>(defaultValue);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const months = useMemo(
    () => [
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
    ],
    []
  );

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

  const formatDate = useCallback(
    (date: Date) => {
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
    [months]
  );

  const getDaysInMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }, []);


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
    onChange?.(newDate);
  };

  const renderCalendarDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  }, [currentMonth, getDaysInMonth, getFirstDayOfMonth]);

  return {
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
    currentMonth,
    datePickerRef,
    setCurrentMonth,
    months,
    formatDate,
    handlePrevMonth,
    handleNextMonth,
    handleDateSelect,
    renderCalendarDays,
  };
};
