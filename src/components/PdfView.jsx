import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();

const PdfView = ({ pdfUrl }) => {
  const [url, setUrl] = useState("");
  console.log(url, "!!!!");

  useEffect(() => {
    (async () => {
      try {
        const pdf = await storageRef.child(pdfUrl).getDownloadURL();
        setUrl(pdf);
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    })();
  }, [pdfUrl]);

  if (!url) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1">אירעה שגיאה בטעינת ה־PDF</Typography>
      </Box>
    );
  }

  return (
    <>
      {pdfUrl ? (
        // <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
        <iframe src={url} height="100px" title="pdf" />
      ) : (
        // </a>
        <p>Loading flyer...</p>
      )}
    </>
  );
};
export default PdfView;
