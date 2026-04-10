export const DAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];

export const formatMonthJP = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};