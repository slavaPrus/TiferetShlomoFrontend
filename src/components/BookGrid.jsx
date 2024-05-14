import { Box, Button, Card, Grid, Typography } from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import { handleAddCart, handleDeleteBookFromCart } from "./cartHandle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { deleteBook } from "../utils/BookUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export const BookGrid = ({
  book,
  index,
  setOpen,
  setSelectedBook,
  setIsNewBook,
  isCart = false,
}) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { bookName, cost, pictureData, stock } = book;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/one-book", { state: book });
  };
  const [isInStock, setIsInStock] = useState(stock > 0);
  const handelDeleteBook = async () => {
    try {
      await deleteBook(book.bookId).then((res) => {
        alert("המחיקה בוצעה בהצלחה");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handelClickEditBook = () => {
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
        <img
          onClick={handleClick}
          src={pictureData ? `data:image/jpeg;base64,${pictureData}` : bamidbar}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Typography
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
        {oneUser && oneUser.userType === 2 ? (
          <Button disabled={!isInStock} onClick={() => handleAddCart(book)}>
            {isInStock ? "הוסף לעגלה" : "אזל המלאי"} <ShoppingCartIcon />
          </Button>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
          >
            {isCart ? (
              (!isInStock && <Typography>אזל המלאי</Typography>,
              (
                <Button onClick={handleDeleteBookFromCart}>
                  הסר <DeleteIcon />
                </Button>
              ))
            ) : (
              <>
                <Button onClick={handelDeleteBook}>
                  מחיקה
                  <DeleteIcon />
                </Button>
                <Button onClick={handelClickEditBook}>
                  עריכה
                  <ModeEditIcon />
                </Button>
              </>
            )}
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default BookGrid;
