
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { HDate, Locale } from '@hebcal/core';
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/webpack';
import HebrewDate from './ReferenceData';

// הגדרת נתיב ל-worker של pdfjs
const myToken=localStorage.getItem("token");
console.log("hhhh",myToken);
GlobalWorkerOptions.workerSrc = `https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media`;


// מפת חודשים עבריים
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
  Sivan: 'סיון',
  Tammuz: 'תמוז',
  Av: 'אב',
  Elul: 'אלול'
};

// פונקציה להמרת מספר לגימטריה
const numberToGematria = (number) => {
  const letters = [
    '', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט',
    'י', 'יא', 'יב', 'יג', 'יד', 'ט"ו', 'ט"ז', 'י"ז', 'יח', 'יט',
    'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט',
    'ל', 
  ];

  return letters[number] || '';
};

const TwoHalachaPerDay = () => {
  const [url] = useState("https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media");
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [pageNumber, setPageNumber] = useState(null);
  const [hebrewDateString, setHebrewDateString] = useState("");

  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  useEffect(() => {
    const fetchHebrewDate = () => {
      const date = new Date();
      const hDate = new HDate(date);
      const gematria = numberToGematria(hDate.getDate());
      const monthName = hebrewMonths[hDate.getMonthName()];
      const hebrewDateString = `${gematria} ${monthName}`;
      setHebrewDateString(hebrewDateString);
    };

    fetchHebrewDate();

    const fetchPDF = async () => {
      try {
        const pdf = await getDocument(url).promise;
        console.log("PDF loaded", pdf);
        let found = false;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const strings = textContent.items.map(item => item.str);
          console.log(`Page ${pageNum}`, strings);

          if (strings.some(str => str.includes(hebrewDateString))) {
            setPageNumber(pageNum);
            found = true;
            break;
          }
        }

        if (!found) {
          setAlert({ open: true, severity: "warning", message: "לא נמצא תאריך עברי במסמך" });
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setAlert({ open: true, severity: "error", message: "שגיאה בטעינת PDF" });
      }
    };

    if (url) {
      fetchPDF();
    } else {
      setAlert({ open: true, severity: "error", message: "שגיאה בקבלת URL של PDF" });
    }
  }, [url]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6">התאריך העברי של היום: {hebrewDateString}</Typography>
      {pageNumber ? (
        <iframe
          src={`${url}#page=${pageNumber}`}
          width="600"
          height="800"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p>טוען PDF...</p>
      )}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TwoHalachaPerDay;
