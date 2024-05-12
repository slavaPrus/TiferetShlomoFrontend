import React from "react";
import { Button, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { addBook, updateBook } from "../utils/BookUtil";

const bookAdmin = (props) => {
  const { onClose, open, book, setbook, isNewBook=false } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleBookChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setbook((prevbook) => ({
      ...prevbook,
      [name]: value,
    }));
  };

  const handleUpdateBook = async () => {
    try {
      await updateBook(book).then((res) => {
        console.log(res);
        alert("העדכון בוצע בהצלחה");
        handleClose();

      });
    } catch (error) {
      alert(error);
    }
  };
  const handleAddBook = async () => {
    try {
      console.log("addbook",book)
      const res = await addBook(book);
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
      setbook((prevbook) => ({
        ...prevbook,
        pictureData: base64String,
      }));
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{isNewBook?"הוספת ספר חדש":"עריכת ספר"}</DialogTitle>
      <Grid
        container
        sx={{
          justifyContent: "center",
          margin: "20px",
          padding: "20px",
          gap: "10px",
        }}
      >
        {book &&
          Object.keys(book).map((bookField, index) => (
            <Grid item xs={3} key={index}>
              <TextField
                type={bookField === "pictureData" ? "file" : "text"}
                label={bookField}
                variant="outlined"
                fullWidth
                margin="normal"
                name={bookField}
                onChange={(event) =>bookField === "pictureData" ? handleImageChange(event):handleBookChange(event)}
              />
            </Grid>
          ))}
        <Button onClick={isNewBook?handleAddBook:handleUpdateBook}>אישור</Button>
        <Button onClick={handleClose}>ביטול</Button>
      </Grid>
    </Dialog>
  );
};

export default bookAdmin;
