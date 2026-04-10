import React, { useState, useRef, useEffect } from 'react';

const DAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];
const formatMonthJP = (date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(new Date(year, month, d));
    }
    return days;
};

const ERAS = [
    { name: "Reiwa", kanji: "令和", start: new Date(2019, 4, 1) },
    { name: "Heisei", kanji: "平成", start: new Date(1989, 0, 8) }
];
function toJapaneseDate(date) {
    for (const era of ERAS) {
        if (date >= era.start) {
            const year = date.getFullYear() - era.start.getFullYear() + 1;
            return {
                era: era.name,
                eraKanji: era.kanji,
                year,
                month: date.getMonth() + 1,
                day: date.getDate()
            };
        }
    }
    throw new Error("Unsupported date");
}

function formatJapaneseDate(jd) {
    return `${jd.eraKanji}${jd.year}年${jd.month}月${jd.day}日`;
}

const JapaneseCalendar = ({ onChange }) => {
    const [current, setCurrent] = useState(new Date());
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const days = getCalendarDays(current);
    const handleClick = (date) => {
        setSelected(date);
        setOpen(false);
        const formatDate = (date) => {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        };
        const iso = formatDate(date);
        onChange === null || onChange === void 0 ? void 0 : onChange(iso);
    };
    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);
    const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    return (React.createElement("div", { style: { position: "relative", width: "250px" }, ref: ref },
        React.createElement("input", { type: "text", readOnly: true, onClick: () => setOpen(!open), value: selected
                ? formatJapaneseDate(toJapaneseDate(selected))
                : "", placeholder: "\u65E5\u4ED8\u3092\u9078\u629E", style: {
                width: "100%",
                padding: "8px",
                cursor: "pointer"
            } }),
        open && (React.createElement("div", { style: {
                position: "absolute",
                top: "40px",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                padding: "10px",
                zIndex: 1000
            } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement("button", { onClick: prevMonth }, "\u25C0"),
                React.createElement("strong", null, formatMonthJP(current)),
                React.createElement("button", { onClick: nextMonth }, "\u25B6")),
            React.createElement("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    marginTop: "10px"
                } },
                DAYS_JP.map((d) => (React.createElement("div", { key: d, style: { textAlign: "center", fontWeight: "bold" } }, d))),
                days.map((d, i) => (React.createElement("div", { key: i, onClick: () => d && handleClick(d), style: {
                        height: "35px",
                        textAlign: "center",
                        cursor: d ? "pointer" : "default",
                        background: selected &&
                            d &&
                            d.toDateString() === selected.toDateString()
                            ? "#007bff"
                            : "transparent",
                        color: selected &&
                            d &&
                            d.toDateString() === selected.toDateString()
                            ? "#fff"
                            : "#000"
                    } }, d ? d.getDate() : ""))))))));
};

export { JapaneseCalendar };
