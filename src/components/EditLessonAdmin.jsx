import React from "react";
import { Button, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { addLesson, updateLesson } from "../utils/LessonUtil";

const lessonAdmin = (props) => {
  const { onClose, open, lesson, setlesson, isNewLesson=false } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleLessonChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setlesson((prevlesson) => ({
      ...prevlesson,
      [name]: value,
    }));
  };

  const handleUpdateLesson = async () => {
    try {
      await updateLesson(lesson).then((res) => {
        console.log(res);
        alert("העדכון בוצע בהצלחה");
        handleClose();

      });
    } catch (error) {
      alert(error);
    }
  };
  const handleAddLesson = async () => {
    try {
      console.log("addlesson",lesson)
      const res = await addLesson(lesson);
      res.status === 200 && alert("הספר נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת הספר");
    }
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(selectedImage);
    }
  };

  const _handleReaderLoaded = (event) => {
    const binaryString = event.target?.result ;
    if (binaryString) {
      const base64String = btoa(binaryString);
      setlesson((prevlesson) => ({
        ...prevlesson,
        pictureData: base64String,
      }));
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{isNewLesson?"הוספת שיעור חדש":"עריכת שיעור"}</DialogTitle>
      <Grid
        container
        sx={{
          justifyContent: "center",
          margin: "20px",
          padding: "20px",
          gap: "10px",
        }}
      >
        {lesson &&
          Object.keys(lesson).map((lessonField, index) => (
            <Grid item xs={3} key={index}>
              <TextField
                type={lessonField === "pictureData" ? "file" : "text"}
                label={lessonField}
                variant="outlined"
                fullWidth
                margin="normal"
                name={lessonField}
                onChange={(event) =>lessonField === "pictureData" ? handleImageChange(event):handleLessonChange(event)}
              />
            </Grid>
          ))}
        <Button onClick={isNewLesson?handleAddLesson:handleUpdateLesson}>אישור</Button>
        <Button onClick={handleClose}>ביטול</Button>
      </Grid>
    </Dialog>
  );
};

export default lessonAdmin;