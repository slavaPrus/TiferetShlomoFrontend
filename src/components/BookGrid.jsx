import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { deleteBook } from "../utils/BookUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

export const BookGrid = ({
  book,
  index,
  setOpen,
  setSelectedBook,
  setIsNewBook,
  setAlert,
}) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const [cartItems, setCartItems] = useState(() => {
    const cartLocal = localStorage.getItem("cartItems");
    return JSON.parse(cartLocal) || [];
  });
  const { bookId, bookName, bookUrl, cost, pictureData, stock } = book;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/one-book", { state: book });
  };

  const [isInStock] = useState(stock > 0);
  const [quantity, setQuantity] = useState(
    cartItems.find((item) => item.bookId === bookId) || 0
  );

  const handleDeleteBook = async () => {
    try {
      const res = await deleteBook(book.bookId);
      if (res.status === 200) {
        setAlert(
          <Alert variant="filled" sx={{ width: "80%" }} severity="success">
            המחיקה בוצעה בהצלחה
          </Alert>
        );
        setTimeout(() => setAlert(null), 9000);
      } else {
        setAlert(
          <Alert variant="filled" sx={{ width: "80%" }} severity="error">
            ארעה שגיאה במהלך המחיקה
          </Alert>
        );
        setTimeout(() => setAlert(null), 9000);
      }
    } catch (error) {
      setAlert(
        <Alert variant="filled" sx={{ width: "80%" }} severity="error">
          ארעה שגיאה
        </Alert>
      );
      setTimeout(() => setAlert(null), 9000);
    }
  };

  const handleClickEditBook = () => {
    setSelectedBook(book);
    setIsNewBook(false);
    setOpen(true);
  };

  const handleAddCart = (book) => {
    try {
      const existingItem = cartItems.find(
        (item) => item.bookId === book.bookId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.pictureData = "";
      } else {
        setCartItems((prev) => [
          ...prev,
          { ...book, quantity: 1, pictureData: "" },
        ]);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setAlert(
        <Alert variant="filled" sx={{ width: "80%" }} severity="success">
          הספר נוסף לעגלה
        </Alert>
      );
      setTimeout(() => setAlert(null), 9000);
    } catch (error) {
      setAlert(
        <Alert variant="filled" sx={{ width: "80%" }} severity="error">
          ארעה שגיאה בהוספת הספר,
          {error}
        </Alert>
      );
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      // מחיקת הספר מהעגלה כאשר הכמות מגיעה ל-1
      try {
        const updateItems = cartItems.filter((item) => item.bookId !== bookId);
        setCartItems(updateItems);

        localStorage.setItem("cartItems", JSON.stringify(updateItems));

        setAlert(
          <Alert variant="filled" sx={{ width: "80%" }} severity="success">
            הספר הוסר מהעגלה בהצלחה
          </Alert>
        );
        setTimeout(() => setAlert(null), 9000);
      } catch (error) {
        setAlert(
          <Alert variant="filled" sx={{ width: "80%" }} severity="error">
            ארעה שגיאה במחיקת הספר: {error.message}
          </Alert>
        );
        setTimeout(() => setAlert(null), 9000);
      }
    } else if (quantity > 1) {
      const updateItems = cartItems.map((item) => {
        if (item.bookId !== bookId) return book;
        return {
         ...book,
         quantity: item.quantity - 1
        }
      });
      setCartItems(updateItems);

      setAlert(
        <Alert variant="filled" sx={{ width: "80%" }} severity="success">
          כמות הספר עודכנה בהצלחה
        </Alert>
      );
      setTimeout(() => setAlert(null), 9000);
    }
  };

  return (
    <>
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
            src={
              pictureData
                ? `data:image/jpeg;base64,${pictureData}`
                : bookUrl ?? bamidbar
            }
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
          {!isInStock && (
            <Typography sx={{ color: "red", marginBottom: 1 }}>
              אזל המלאי
            </Typography>
          )}
          
          {oneUser?.userType === 2 ? (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <>
                <Button onClick={() => handleDeleteBook()}>
                  מחיקה
                  <DeleteIcon />
                </Button>
                <Button onClick={() => handleClickEditBook()}>
                  עריכה
                  <ModeEditIcon />
                </Button>
              </>
            </Box>
          ) : quantity === 0 ? (
            <Button disabled={!isInStock} onClick={() => handleAddCart(book)}>
              הוסף לעגלה <ShoppingCartIcon />
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <IconButton
                onClick={() => handleDecreaseQuantity()}
                disabled={quantity < 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton
                onClick={() => handleAddCart(book)}
                disabled={quantity >= stock || quantity < 1}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Card>
      </Grid>
    </>
  );
};

export default BookGrid;
