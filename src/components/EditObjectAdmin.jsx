import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Snackbar,
  Box,
} from "@mui/material";
import * as BookUtil from "../utils/BookUtil";
import * as FlyerUtil from "../utils/FlyerUtil";
import * as LessonUtil from "../utils/LessonUtil";
import { firebaseConfig } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import { useUploadFile } from "react-firebase-hooks/storage";

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const EditObjectAdmin = (props) => {
  const { onClose, open, objectType, objectData, setObject, isNewObject } =
    props;
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [image, setImage] = useState(null);

  const utilMap = {
    Book: BookUtil,
    Flyer: FlyerUtil,
    Lesson: LessonUtil,
  };

  const selectedUtil = utilMap[objectType];

  const storage = firebase.storage();
  const storageRef = storage.ref();

  useEffect(() => {
    console.log(objectData);
  }, [objectData]);

  const handleClose = () => {
    onClose(false);
  };

  const handleObjectChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name.includes("Url") && event.target.files[0]) {
      setImage(event.target.files[0]);
      let url;

      name === "flyerUrl"
        ? (url = await uploadPdf(event.target.files[0]))
        : (url = await uploadImage(event.target.files[0]));

      setObject((prevObject) => ({
        ...prevObject,
        [name]: url,
      }));
    } else {
      setObject((prevObject) => ({
        ...prevObject,
        [name]: value,
      }));
    }
  };

  const handleUpdateObject = async () => {
    try {
      const res = await selectedUtil[`update${objectType}`](objectData);
      console.log(res);
      setAlert({
        open: true,
        severity: "success",
        message: "העדכון בוצע בהצלחה",
      });
      handleClose();
    } catch (error) {
      setAlert({ open: true, severity: "error", message: error.message });
    }
  };

  const handleAddObject = async () => {
    try {
      const res = await selectedUtil[`add${objectType}`](objectData);
      console.log("res", res);
      setAlert({ open: true, severity: "success", message: "הוסף בהצלחה" });
      handleClose();
    } catch (error) {
      setAlert({ open: true, severity: "error", message: "ארעה שגיאה בהוספה" });
    }
  };

  const uploadImage = async (imageFile) => {
    const imageUrl = `images/${imageFile.name}`;
    const imagesRef = storageRef.child(imageUrl);

    imagesRef.put(imageFile).then(() => {
      console.log("Image uploaded successfully");
    });
    return imageUrl;
  };
  const uploadPdf = async (pdfFile) => {
    const pdfUrl = `flyers/${pdfFile.name}`;
    const pdfRef = storageRef.child(pdfUrl);
    pdfRef.put(pdfFile).then(() => {
      console.log("pdf uploaded successfully");
    });
    return pdfUrl;
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { padding: "30px" },
        }}
      >
        <DialogTitle display={"flex"} justifyContent={"center"}>
          {isNewObject ? "הוספה" : `${objectType} עריכת  `}
        </DialogTitle>
        <Grid
          container
          sx={{
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {objectData &&
            Object.keys(objectData).map((objectField, index) => (
              <Grid item xs={3} key={index}>
                <TextField
                  type={objectField.includes("Url") ? "file" : "text"}
                  label={objectField.includes("Url") ? "" : objectField}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name={objectField}
                  value={
                    objectField.includes("Url") ? "" : objectData[objectField]
                  }
                  onChange={(event) => handleObjectChange(event)}
                />
              </Grid>
            ))}
        </Grid>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"20px"}
          gap={"10px"}
        >
          <Button
            variant="contained"
            onClick={isNewObject ? handleAddObject : handleUpdateObject}
          >
            אישור
          </Button>
          <Button variant="contained" onClick={handleClose}>
            ביטול
          </Button>
        </Box>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          variant="filled"
          sx={{ width: "80%" }}
          onClose={handleCloseAlert}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditObjectAdmin;
