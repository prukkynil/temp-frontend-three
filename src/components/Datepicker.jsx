import { useState, useMemo } from "react";

export default function Datepicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString()
    : "";

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  const calendarDays = useMemo(() => {
    const days = [];
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    // previous month days
    const prevMonthDays = daysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        otherMonth: true,
      });
    }
    // current month days
    const thisMonthDays = daysInMonth(currentYear, currentMonth);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        otherMonth: false,
      });
    }
    // next month days (fill to 6 weeks grid)
    const nextDays = 42 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        otherMonth: true,
      });
    }
    return days;
  }, [currentMonth, currentYear]);

  const currentMonthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  function toggleCalendar() {
    setShowCalendar((v) => !v);
  }
  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  }
  function selectDate(day) {
    if (day.otherMonth) return;
    setSelectedDate(day.date);
    setShowCalendar(false);
  }
  function isSelected(day) {
    return (
      selectedDate &&
      day.date.toDateString() === selectedDate.toDateString()
    );
  }

  return (
    <div className="relative inline-block">
      <input
        type="text"
        readOnly
        value={formattedDate}
        onClick={toggleCalendar}
        placeholder="Select date"
        style={{
          width: "10rem",
          padding: "0.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "1em",
          color: "#1a1a1a",
          background: "var(--color-neutral-50, #f8fafc)",
          outline: "none",
        }}
        className="focus:ring-2 focus:ring-blue-500"
      />
      {showCalendar && (
        <div
          style={{
            background: "var(--color-white, #fff)",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            zIndex: 50,
            padding: "1rem",
            marginTop: "0.5rem",
            position: "absolute",
            left: 0,
            top: "100%",
          }}
        >
          {/* header */}
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={prevMonth}
              style={{
                padding: "0.25rem",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              className="hover:bg-gray-200"
            >
              &lt;
            </button>
            <span style={{ fontWeight: 500 }}>
              {currentMonthName} {currentYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              style={{
                padding: "0.25rem",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              className="hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
          {/* weekdays */}
          <div className="grid grid-cols-7 text-center mb-1">
            {weekdays.map((day) => (
              <span
                key={day}
                style={{
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: "inherit",
                }}
              >
                {day}
              </span>
            ))}
          </div>
          {/* days */}
          <div className="grid grid-cols-7 text-center">
            {calendarDays.map((day) => (
              <span
                key={day.date}
                onClick={() => selectDate(day)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "9999px",
                  cursor: day.otherMonth ? "default" : "pointer",
                  color: day.otherMonth
                    ? "#9ca3af"
                    : isSelected(day)
                    ? "#fff"
                    : "#1a1a1a",
                  background: isSelected(day)
                    ? "#3b82f6"
                    : day.otherMonth
                    ? "none"
                    : undefined,
                  fontFamily: "inherit",
                }}
                className={
                  !day.otherMonth
                    ? "hover:bg-blue-100"
                    : ""
                }
              >
                {day.date.getDate()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}