export function formatJapaneseDate(jd: any) {
  return `${jd.eraKanji}${jd.year}年${jd.month}月${jd.day}日`;
}