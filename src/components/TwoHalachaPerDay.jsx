

import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Box, Typography, Link } from '@mui/material';
import { HDate } from '@hebcal/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/webpack';

// הגדרת נתיב ל-worker של pdfjs
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
GlobalWorkerOptions.workerSrc = workerSrc;

console.log("PDF.js worker source:", workerSrc);

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
    '', "א'", 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט',
    'י', 'י"א', 'י"ב', 'י"ג', 'י"ד', 'ט"ו', 'ט"ז', 'י"ז', 'י"ח', 'יט',
    "כ'", 'כ"א', 'כ"ב', 'כ"ג', 'כ"ד', 'כ"ה', 'כ"ו', 'כ"ז', 'כ"ח', 'כ"ט',
    'ל', 
  ];

  return letters[number] || '';
};

const TwoHalachaPerDay = () => {
  const [url] = useState("https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media&token=a30af0eb-2055-4696-a95a-b6d7e92d4b6d");
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
  });
  //   const fetchPDF = async () => {
  //     try {
  //       debugger;
  //       console.log("Attempting to load PDF from URL:", url);
  //       const pdf = await getDocument(url).promise;
  //       console.log("PDF loaded", pdf);
  //       let found = false;

  //       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  //         const page = await pdf.getPage(pageNum);
  //         const textContent = await page.getTextContent();
  //         const strings = textContent.items.map(item => item.str).join(' ');
  //         console.log(`Page ${pageNum} text content:`, strings);

  //         if (strings.includes(hebrewDateString)) {
  //           setPageNumber(pageNum);
  //           found = true;
  //           break;
  //         }
  //       }

  //       if (!found) {
  //         setAlert({ open: true, severity: "warning", message: "לא נמצא תאריך עברי במסמך" });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching PDF:", error);
  //       setAlert({ open: true, severity: "error", message: "שגיאה בטעינת PDF" });
  //     }
  //   };

  //   if (url) {
  //     fetchPDF();
  //   } else {
  //     setAlert({ open: true, severity: "error", message: "שגיאה בקבלת URL של PDF" });
  //   }
  // }, [url]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <br></br>
      <Typography variant="h4" sx= {{fontSize: '30px',fontWeight: 'bold', color:"#0B1365", fontWeight:"700"}}>שתי הלכות ביום </Typography>
      <Typography variant="h6" sx= {{fontSize: '20px',fontWeight: 'bold', color:"#0B1365", fontWeight:"700"}}>התאריך העברי של היום: {hebrewDateString}</Typography>
      <br></br>
      <Typography variant="h7" sx={{fontSize: '20px',fontWeight: 'bold', color:"#0B1365", fontWeight:"700"}}>
  עקב פניות נפתחה קבוצת וואצאפ לקבלת שתי הלכות ליום
 קישור להצטרפות
      </Typography>
      <Link> https://chat.whatsapp.com/IbolkQmMIVm5GBIjXz4Lo2 </Link>  
      {pageNumber ? (
        <iframe
          src={`${url}#page=${pageNumber}`}
          width="600"
          height="800"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p></p>
      )}
      {!pageNumber && (
        <iframe
          src={url}
          width="600"
          height="800"
          title="PDF Viewer"
        ></iframe>
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
}
export default TwoHalachaPerDay;
