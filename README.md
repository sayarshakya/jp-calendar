jp-calendar

A lightweight and customizable Japanese Calendar Date Picker for React applications.

It displays dates in Japanese format with Kanji (和暦/日本語表示 support) while internally storing and managing dates in the Gregorian calendar (ISO format) for database compatibility.
Features
Japanese date format with Kanji support
Gregorian (ISO) date storage for backend/database
React-based lightweight component
Fully responsive UI
Click-to-open calendar popup
Readonly input with custom formatting
Easy to customize styles
TypeScript support
Ready for npm integration

Installation
npm install jp-calendar

Usage
import JapaneseCalendar from "jpcalendar";

export default function App() {
  return (
    <JapaneseCalendar
      onChange={(date) => {
        console.log("Save to DB (Gregorian):", date);
      }}
    />
  );
}

Example Output
UI Display:
2026年4月10日 (金)
Stored Value:
2026-04-10

UI Behavior
Click input → opens calendar
Click outside → closes calendar
Shows Japanese formatted date
Stores ISO format internally