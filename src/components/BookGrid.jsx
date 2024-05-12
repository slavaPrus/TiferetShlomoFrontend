import { Box, Button, Card, Grid, Typography } from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import { handleAddCart } from "./cartHandle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { deleteBook } from "../utils/BookUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const BookGrid = ({ book, index, setOpen, setSelectedBook,setIsNewBook }) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { bookName, cost, pictureData } = book;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/one-book", { state: book });
  };

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
          height: "300px",
          width: "200px",
          p: "10px 40px",
          borderRadius: "10px",
          gap: "",
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
          src={`data:image/jpeg;base64,${pictureData}`}
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
          <Typography sx={{ textAlign: "center" }}>{bookName}</Typography>
          <Typography sx={{ textAlign: "center" }}>{cost} ₪</Typography>
          {oneUser && oneUser.userType === 2 ? (
            <Button onClick={() => handleAddCart(book)}>
              הוסף לעגלה
              <ShoppingCartIcon />
            </Button>
          ) : (
            <>
              <Button onClick={handelDeleteBook}>
                מחיקה
                <ShoppingCartIcon />
              </Button>
              <Button onClick={handelClickEditBook} >
                עריכה
                <ModeEditIcon />
              </Button>
            </>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default BookGrid;
