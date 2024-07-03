import React, { useState, useEffect } from "react";
import { Snackbar, Alert, Box, Typography } from "@mui/material";
import { HDate } from "@hebcal/core";
import { PDFDocument } from "pdf-lib";

const hebrewMonths = {
  Tishrei: "תשרי",
  Cheshvan: "חשון",
  Kislev: "כסלו",
  Tevet: "טבת",
  Shevat: "שבט",
  Adar: "אדר",
  "Adar II": "אדר ב׳",
  Nisan: "ניסן",
  Iyar: "אייר",
  Sivan: "סיון",
  Tammuz: "תמוז",
  Av: "אב",
  Elul: "אלול",
};

const numberToGematria = (number) => {
  const letters = [
    "",
    "א'",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    'י"א',
    'י"ב',
    'י"ג',
    'י"ד',
    'ט"ו',
    'ט"ז',
    'י"ז',
    'י"ח',
    "יט",
    "כ'",
    'כ"א',
    'כ"ב',
    'כ"ג',
    'כ"ד',
    'כ"ה',
    'כ"ו',
    'כ"ז',
    'כ"ח',
    'כ"ט',
    "ל",
  ];

  return letters[number] || "";
};

const TwoHalachaPerDay = () => {
  const [url] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media&token=a30af0eb-2055-4696-a95a-b6d7e92d4b6d"
  );
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
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

    const searchInPDF = async () => {
      try {
        const response = await fetch(url);
        const pdfBytes = await response.arrayBuffer();

        const pdfDoc = await PDFDocument.load(pdfBytes);

        let found = false;
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
          const page = pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join("");

          if (text.includes(hebrewDateString)) {
            setPageNumber(i + 1);
            found = true;
            break;
          }
        }

        if (!found) {
          setAlert({
            open: true,
            severity: "warning",
            message: "לא נמצא תאריך עברי במסמך",
          });
        }
      } catch (error) {
        console.error("Error loading or searching PDF:", error);
        setAlert({
          open: true,
          severity: "error",
          message: "שגיאה בטעינת או חיפוש ב-PDF",
        });
      }
    };

    if (url) {
      searchInPDF();
    } else {
      setAlert({
        open: true,
        severity: "error",
        message: "שגיאה בקבלת כתובת URL של PDF",
      });
    }
  }, [url, hebrewDateString]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <br></br>
      <Typography variant="h6" sx={{ fontSize: "25px", fontWeight: "bold" }}>
        התאריך העברי של היום: {hebrewDateString}
      </Typography>
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
      {!pageNumber && (
        <iframe src={url} width="600" height="800" title="PDF Viewer"></iframe>
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
