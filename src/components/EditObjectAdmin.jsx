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
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

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

  useEffect(() => {
    console.log(objectData);
  }, [objectData]);

  const handleClose = () => {
    onClose(false);
  };

  const handleObjectChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "bookUrl" && event.target.files[0]) {
      setImage(event.target.files[0]);
      const imageUrl = await uploadImage(event.target.files[0]);
      setObject((prevObject) => ({
        ...prevObject,
        [name]: imageUrl,
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
      setAlert({ open: true, severity: "success", message: "הוסף בהצלחה" });
      handleClose();
    } catch (error) {
      setAlert({ open: true, severity: "error", message: "ארעה שגיאה בהוספה" });
    }
  };

  const uploadImage = async (imageFile) => {
    const imageUrl = `images/${imageFile.name}`;
    console.log("**********************File*************", imageFile);
    console.log("***********************************", imageUrl);
    const storageRef = ref(storage, imageUrl);
    await uploadBytes(storageRef, imageFile);
    // const imageUrl = await getDownloadURL(storageRef);
    // await axios
    //   .post("/api/save-image-url", { url: imageUrl })
    //   .then((response) => {
    //     console.log("Image URL saved successfully:", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving image URL:", error);
    //   });
    return imageUrl;
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
          sx: {
            paddingTop: "50px",
          },
        }}
      >
        <DialogTitle display={"flex"} justifyContent={"center"}>
          {isNewObject ? "הוספה" : `${objectType} עריכת  `}
        </DialogTitle>
        <Grid
          container
          sx={{
            justifyContent: "center",
            margin: "20px",
            padding: "20px",
            gap: "10px",
          }}
        >
          {objectData &&
            Object.keys(objectData).map((objectField, index) => (
              <Grid item xs={3} key={index}>
                <TextField
                  type={objectField.includes("Url") ? "file" : "text"}
                  label={objectField.includes("Url") ? objectField : ""}
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

