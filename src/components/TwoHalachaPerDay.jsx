import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const TwoHalachaPerDay = () => {
  const [url] = useState("https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media&token=a30af0eb-2055-4696-a95a-b6d7e92d4b6d");
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  useEffect(() => {
    if (!url) {
      setAlert({ open: true, severity: "error", message: "שגיאה בקבלת URL של PDF" });
    }
  }, [url]);

  return (
    <div>
      {url ? (
        <iframe
          src={url}
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
    </div>
  );
};

export default TwoHalachaPerDay;
