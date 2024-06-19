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
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';

const EditObjectAdmin = (props) => {
  const { onClose, open, objectType, objectData, setObject, isNewObject } = props;
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(objectData);
  }, [objectData]);

  const handleClose = () => {
    onClose(false);
  };

  const handleObjectChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "pictureData" && event.target.files[0]) {
      setImage(event.target.files[0]);
      const imageUrl = await uploadImage(event.target.files[0]);
      setObject((prevObject) => ({
        ...prevObject,
        imageUrl,
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
      const res = await BookUtil[`update${objectType}`](objectData);
      console.log(res);
      setAlert({ open: true, severity: "success", message: "העדכון בוצע בהצלחה" });
      handleClose();
    } catch (error) {
      setAlert({ open: true, severity: "error", message: error.message });
    }
  };

  const handleAddObject = async () => {
    try {
      const res = await BookUtil[`add${objectType}`](objectData);
      setAlert({ open: true, severity: "success", message: "הוסף בהצלחה" });
      handleClose();
    } catch (error) {
      setAlert({ open: true, severity: "error", message: "ארעה שגיאה בהוספה" });
    }
  };

  const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    await axios.post('/api/save-image-url', { url: imageUrl })
      .then(response => {
        console.log('Image URL saved successfully:', response);
      })
      .catch(error => {
        console.error('Error saving image URL:', error);
      });
    return imageUrl;
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{isNewObject ? "הוספה" : "עריכת"}</DialogTitle>
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
                  type={objectField === "pictureData" ? "file" : "text"}
                  label={objectField !== "pictureData" ? objectField : ""}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name={objectField}
                  value={objectField !== "pictureData" ? objectData[objectField] : ""}
                  onChange={(event) =>
                    objectField === "pictureData"
                      ? handleObjectChange(event)
                      : handleObjectChange(event)
                  }
                />
              </Grid>
            ))}
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} marginTop={"20px"}>
            <input type="file" onChange={handleObjectChange} name="pictureData" />
          </Box>
          <Button onClick={isNewObject ? handleAddObject : handleUpdateObject}>
            אישור
          </Button>
          <Button onClick={handleClose}>ביטול</Button>
        </Grid>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert variant="filled" sx={{ width: "80%" }} onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditObjectAdmin;
