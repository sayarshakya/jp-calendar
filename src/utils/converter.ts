export const ERAS = [
  { name: "Reiwa", kanji: "令和", start: new Date(2019, 4, 1) },
  { name: "Heisei", kanji: "平成", start: new Date(1989, 0, 8) }
];

export function toJapaneseDate(date: Date) {
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