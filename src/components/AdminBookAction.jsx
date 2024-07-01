import { Box, Button } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleDeleteBook } from "./BookFunc";

export default function AdminBookAction({
  book,
  handleClickEditBook,
  setAlert
}) {
  return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
      <Button onClick={() => handleDeleteBook(book,setAlert)}>
        מחיקה
        <DeleteIcon />
      </Button>
      <Button onClick={() => handleClickEditBook()}>
        עריכה
        <ModeEditIcon />
      </Button>
    </Box>
  );
}
