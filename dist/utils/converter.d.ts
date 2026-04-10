export declare const ERAS: {
    name: string;
    kanji: string;
    start: Date;
}[];
export declare function toJapaneseDate(date: Date): {
    era: string;
    eraKanji: string;
    year: number;
    month: number;
    day: number;
};
