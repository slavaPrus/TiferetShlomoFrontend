import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BookAction from "./BookAction";
import ImageView from "./ImageView";

export default function OneBook() {
  const location = useLocation();
  const [book, setBook] = React.useState(location.state);

  useEffect(() => {
    if (location.state) {
      // If there's book data in the location state, save it to sessionStorage
      sessionStorage.setItem("book", JSON.stringify(location.state));
    } else {
      // If there's no book data in the location state, try to get it from sessionStorage
      const savedBook = sessionStorage.getItem("book");
      if (savedBook) {
        setBook(JSON.parse(savedBook));
      }
    }
  }, [location.state]);

  console.log("Received book:", book); // Debugging line

  // Ensure book object exists and has the expected properties
  if (!book) {
    return <Typography>Invalid book data</Typography>;
  }

  const { bookName, cost, describe, img, bookUrl } = book;

  const handleWatchBook = () => {
    window.open(
      "https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/2Halachas%2F%D7%A9%D7%AA%D7%99%20%D7%94%D7%9C%D7%9B%D7%95%D7%AA%20%D7%AA%D7%A9%D7%A4%D7%93%20%D7%A0%D7%A9%D7%9C%D7%97%20%D7%9C%D7%93%D7%A4%D7%95%D7%A1%20(1).pdf?alt=media&token=a30af0eb-2055-4696-a95a-b6d7e92d4b6d",
      "_blank"
    );
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      gap={"30px"}
      paddingY={"55px"}
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
          ₪ {cost}
        </Typography>
        {/* <BookAction book={book} setAlert={setAlert}/> */}
      </Box>
      <Box width={"50%"} overflow={"auto"}>
        <ImageView imageUrl={bookUrl}></ImageView>
      </Box>
    </Box>
  );
}
