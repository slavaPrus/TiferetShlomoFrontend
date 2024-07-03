import { Box, Card, Grid, Typography } from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookAction from "./BookAction";
import AdminBookAction from "./AdminBookAction";
import ImageView from "./ImageView";

export const BookGrid = ({
  book,
  index,
  setOpen,
  setSelectedBook,
  setIsNewBook,
  setAlert,
}) => {
  const userType = useSelector((state) => state.users.oneUser)?.userType;

  const { bookName, bookUrl, cost } = book;
  console.log("bookgrid", book)
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating with book:", book); // Debugging line
    navigate("/one-book", { state: book });
  };

  const handleClickEditBook = () => {
    setSelectedBook(book);
    setIsNewBook(false);
    setOpen(true);
  };

  return (
    <Grid
      item
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      rowGap={"15px"}
    >
      <Card
        key={index}
        sx={{
          width: "200px",
          p: "20px 40px",
          borderRadius: "10px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            border: "1px solid #ccc",
            transform: "scale(1.2)",
            transition: "all 0.6s ease",
            filter: "brightness(0.8)",
          },
        }}
      >
      
        <ImageView imageUrl={(bookUrl == null || bookUrl == "") ? "images/זאת אמונתי.JPG" : bookUrl} name={bookName} handleClick={handleClick}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
          }}
        >  <Typography
          sx={{ textAlign: "center", fontWeight: "600", color: "#0B1365" }}
        >
            {bookName}
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontWeight: "600", color: "#0B1365" }}
          >
            {cost} ₪
          </Typography>
        </Box>

        {userType === 2 ? (
          <AdminBookAction
            book={book}
            handleClickEditBook={handleClickEditBook}
            setAlert={setAlert}
          />
        ) : (
          <BookAction book={book} setAlert={setAlert} />
        )}
      </Card>
    </Grid>
  );
};

export default BookGrid;
