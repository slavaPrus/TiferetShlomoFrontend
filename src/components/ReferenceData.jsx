import React from 'react';
import ReactDOM from 'react-dom';
import { HDate } from '@hebcal/core';

// רשימת חודשים בעברית
const hebrewMonths = {
  Tishrei: 'תשרי',
  Cheshvan: 'חשון',
  Kislev: 'כסלו',
  Tevet: 'טבת',
  Shevat: 'שבט',
  Adar: 'אדר',
  'Adar II': 'אדר ב׳',
  Nisan: 'ניסן',
  Iyar: 'אייר',
  Sivan: 'סיוון',
  Tammuz: 'תמוז',
  Av: 'אב',
  Elul: 'אלול'
};

// פונקציה להמרת מספר לגימטריה
const numberToGematria = (number) => {
  const letters = [
    '', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט',
    'י', 'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט',
    'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט',
    'ל'
  ];

  return letters[number] || '';
};

// קומפוננטה להצגת התאריך העברי
const HebrewDate = ({ number, month }) => {
  const gematria = numberToGematria(number);
  const hebrewMonth = hebrewMonths[month] || 'חודש לא חוקי';

  return (
    <div>
      <p>הגימטריא של המספר: {gematria}</p>
      <p>שם החודש העברי: {hebrewMonth}</p>
    </div>
  );
};

// יצירת תאריך עברי
const date = new Date();
const hDate = new HDate(date);

// שליחת התאריך העברי לקומפוננטה
ReactDOM.render(
  <HebrewDate number={hDate.getDate()} month={hDate.getMonthName()} />,
  document.getElementById('root')
);

export default HebrewDate;
