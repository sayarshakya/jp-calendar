import React, { useState, useRef, useEffect } from "react";
import { DAYS_JP, formatMonthJP } from "../utils/japanese";
import { getCalendarDays } from "../utils/calendar";
import { toJapaneseDate } from "../utils/converter";
import { formatJapaneseDate } from "../utils/formatter";

interface Props {
  onChange?: (date: string) => void; // YYYY-MM-DD
}

export const JapaneseCalendar: React.FC<Props> = ({ onChange }) => {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const days = getCalendarDays(current);

  const handleClick = (date: Date) => {
    setSelected(date);
    setOpen(false);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const iso = formatDate(date);
    onChange?.(iso);
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

  return (
    <div style={{ position: "relative", width: "250px" }} ref={ref}>
      
      <input
        type="text"
        readOnly
        onClick={() => setOpen(!open)}
        value={
          selected
            ? formatJapaneseDate(toJapaneseDate(selected))
            : ""
        }
        placeholder="日付を選択"
        style={{
          width: "100%",
          padding: "8px",
          cursor: "pointer"
        }}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            zIndex: 1000
          }}
        >

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={prevMonth}>◀</button>
            <strong>{formatMonthJP(current)}</strong>
            <button onClick={nextMonth}>▶</button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              marginTop: "10px"
            }}
          >
            {DAYS_JP.map((d) => (
              <div key={d} style={{ textAlign: "center", fontWeight: "bold" }}>
                {d}
              </div>
            ))}

            {days.map((d, i) => (
              <div
                key={i}
                onClick={() => d && handleClick(d)}
                style={{
                  height: "35px",
                  textAlign: "center",
                  cursor: d ? "pointer" : "default",
                  background:
                    selected &&
                    d &&
                    d.toDateString() === selected.toDateString()
                      ? "#007bff"
                      : "transparent",
                  color:
                    selected &&
                    d &&
                    d.toDateString() === selected.toDateString()
                      ? "#fff"
                      : "#000"
                }}
              >
                {d ? d.getDate() : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};