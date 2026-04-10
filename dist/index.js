'use strict';

var React = require('react');

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

const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};
const JapaneseCalendar = ({ onChange }) => {
    const [current, setCurrent] = React.useState(new Date());
    const [selected, setSelected] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    const days = getCalendarDays(current);
    const handleClick = (date) => {
        setSelected(date);
        setOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(formatDate(date));
    };
    React.useEffect(() => {
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
    return (React.createElement("div", { ref: ref, style: { position: "relative", width: "100%", maxWidth: "320px" } },
        React.createElement("input", { type: "text", readOnly: true, onClick: () => setOpen(!open), value: selected ? formatJapaneseDate(toJapaneseDate(selected)) : "", placeholder: "\u65E5\u4ED8\u3092\u9078\u629E", style: {
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                fontSize: "14px"
            } }),
        open && (React.createElement("div", { style: {
                position: "absolute",
                top: "110%",
                left: 0,
                width: "100%",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                padding: "12px",
                zIndex: 1000
            } },
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px"
                } },
                React.createElement("button", { onClick: prevMonth, style: navBtn }, "\u25C0"),
                React.createElement("strong", { style: { fontSize: "14px" } }, formatMonthJP(current)),
                React.createElement("button", { onClick: nextMonth, style: navBtn }, "\u25B6")),
            React.createElement("div", { style: grid },
                DAYS_JP.map((d) => (React.createElement("div", { key: d, style: dayHeader }, d))),
                days.map((d, i) => {
                    const isSelected = selected &&
                        d &&
                        d.toDateString() === selected.toDateString();
                    return (React.createElement("div", { key: i, onClick: () => d && handleClick(d), style: {
                            ...dayCell,
                            background: isSelected ? "#2563eb" : "transparent",
                            color: isSelected ? "#fff" : "#000",
                            opacity: d ? 1 : 0.3
                        } }, d ? d.getDate() : ""));
                }))))));
};
// 🎨 Styles
const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px"
};
const dayHeader = {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 600,
    color: "#666"
};
const dayCell = {
    textAlign: "center",
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

exports.JapaneseCalendar = JapaneseCalendar;
