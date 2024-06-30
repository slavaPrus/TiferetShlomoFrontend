import { Box, Button, Typography } from "@mui/material";
import React from "react";
import bamidbar from "../pictures/bamidbar.png";
import { Link, useLocation } from "react-router-dom";
import BookAction from "./BookAction";

export default function OneBook() {
  const location = useLocation();
  const { state: book } = location || {};
  
  // Ensure book object exists and has the expected properties
  if (!book || !book.bookName || !book.describe || !book.bookUrl || !book.cost) {
    return <Typography>Invalid book data</Typography>;
  }

  const { bookName, cost, describe, img, bookUrl } = book;
  
  const handleWatchBook = () => {
    window.open(bookUrl, "_blank");
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      gap={"30px"}
    >
      <Box
        maxWidth={"250px"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"space-between"}
        gap={"15px"}
      >
        <Typography sx={{ fontSize: "25px", fontWeight: "800" }}>
          {bookName}
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
          {describe}
        </Typography>
        <Link
          variant="contained"
          onClick={() => {
            handleWatchBook();
          }}
        >
          לעיון בספר
        </Link>
        <Typography
          sx={{ fontSize: "25px", fontWeight: "800", textAlign: "center" }}
        >
          {cost} ₪
        </Typography>
        {/* <BookAction book={book} setAlert={setAlert}/> */}
      </Box>
      <img src={bamidbar} height={"600px"} alt={bookName} />
    </Box>
  );
}
