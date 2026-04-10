import React, { useState, useRef, useEffect, useMemo  } from "react";
import { DAYS_JP, formatMonthJP } from "../utils/japanese";
import { getCalendarDays } from "../utils/calendar";
import { toJapaneseDate } from "../utils/converter";
import { formatJapaneseDate } from "../utils/formatter";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const JapaneseCalendar = ({ onChange }: any) => {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const days = getCalendarDays(current);

  const handleClick = (date: Date) => {
    setSelected(date);
    setOpen(false);
    onChange?.(formatDate(date));
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const prevMonth = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

  const currentDate = useMemo(() => {
    return formatJapaneseDate(toJapaneseDate(new Date()));
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
        <input
          type="text"
          readOnly
          onClick={() => setOpen(!open)}
          value={
            selected
              ? formatJapaneseDate(toJapaneseDate(selected))
              : ""
          }
          placeholder={`今日: ${currentDate}`}
          style={{
            width: "100%",
            padding: "10px 40px 10px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
            fontSize: "14px",
            outline: "none"
          }}
        />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "12px",
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            <button onClick={prevMonth} style={navBtn}>◀</button>
            <strong style={{ fontSize: "14px" }}>
              {formatMonthJP(current)}
            </strong>
            <button onClick={nextMonth} style={navBtn}>▶</button>
          </div>

          {/* Days Header */}
          <div style={grid}>
            {DAYS_JP.map((d) => (
              <div key={d} style={dayHeader}>
                {d}
              </div>
            ))}

            {/* Dates */}
            {days.map((d, i) => {
              const isSelected =
                selected &&
                d &&
                d.toDateString() === selected.toDateString();

              return (
                <div
                  key={i}
                  onClick={() => d && handleClick(d)}
                  style={{
                    ...dayCell,
                    background: isSelected ? "#2563eb" : "transparent",
                    color: isSelected ? "#fff" : "#000",
                    opacity: d ? 1 : 0.3
                  }}
                >
                  {d ? d.getDate() : ""}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px"
};

const dayHeader = {
  textAlign: "center" as const,
  fontSize: "12px",
  fontWeight: 600,
  color: "#666"
};

const dayCell = {
  textAlign: "center" as const,
  padding: "8px 0",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  transition: "0.2s",
};

const navBtn = {
  border: "none",
  background: "#f1f5f9",
  borderRadius: "6px",
  padding: "4px 8px",
  cursor: "pointer"
};