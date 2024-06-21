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
  const { bookId, bookName, bookUrl, cost, pictureData, stock } = book;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/one-book", { state: book, handleAddCart });
  };
  const getInitialQuantity = () => {
    let cartLocal = localStorage.getItem("cartItems");
    let cartItems = cartLocal ? JSON.parse(cartLocal) : [];
    const existingItem = cartItems.find((item) => item.bookId === bookId);
    return existingItem ? existingItem.quantity : 0;
  };
  const [isInStock, setIsInStock] = useState(stock > 0);
  const [quantity, setQuantity] = useState(
    book.quantity > 0 ? book.quantity : 0
  );

  useEffect(() => {
    setQuantity(getInitialQuantity());
  }, [bookId]);

  const handleDeleteBook = async () => {
    try {
      const res = await deleteBook(book.bookId);
      if (res.status === 200) {
        setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="success"> המחיקה בוצעה בהצלחה </Alert>);
        setTimeout(() => setAlert(null), 9000);
      } else {
        setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="error">ארעה שגיאה במהלך המחיקה </Alert>);
        setTimeout(() => setAlert(null), 9000);
      }
    } catch (error) {
      setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="error"> ארעה שגיאה </Alert>);
      setTimeout(() => setAlert(null), 9000);
    }
  };

  const handleClickEditBook = () => {
    setSelectedBook(book);
    setIsNewBook(false);
    setOpen(true);
  };

  const handleAddCart = (book) => {
    let cartLocal = localStorage.getItem("cartItems");
    let cartItems = cartLocal == null ? [] : JSON.parse(cartLocal);
    const existingItem = cartItems.find((item) => item.bookId === book.bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...book, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setQuantity((prevQuantity) => prevQuantity + 1);
    setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="success">הספר נוסף לעגלה</Alert>);
    setTimeout(() => setAlert(null), 9000);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateCartQuantity(book.bookId, newQuantity);
      setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="success">הספר נוסף לעגלה</Alert>);
      setTimeout(() => setAlert(null), 99999);
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateCartQuantity(book.bookId, newQuantity);
        setAlert(<Alert variant="filled" sx={{width:"80%"}} severity="success"> המחיקה בוצעה בהצלחה </Alert>);
        setTimeout(() => setAlert(null), 9000);
        return newQuantity;
      });
    }
  };

  const updateCartQuantity = (bookId, newQuantity) => {
    let cartLocal = localStorage.getItem("cartItems");
    let cartItems = cartLocal ? JSON.parse(cartLocal) : [];

    const itemIndex = cartItems.findIndex((item) => item.bookId === bookId);

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      console.error("Item not found in cart");
    }
  };
console.log("!",oneUser.userType)
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
              pictureData ? `data:image/jpeg;base64,${pictureData}` :bookUrl?? bamidbar
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
          {quantity !== 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <IconButton
                onClick={handleDecreaseQuantity}
                disabled={quantity < 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton
                onClick={handleIncreaseQuantity}
                disabled={quantity >= stock || quantity < 1}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
          {oneUser && oneUser.userType === 2 ?  (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <>
                <Button onClick={handleDeleteBook}>
                  מחיקה
                  <DeleteIcon />
                </Button>
                <Button onClick={handleClickEditBook}>
                  עריכה
                  <ModeEditIcon />
                </Button>
              </>
            </Box>
          ):(
            <Button disabled={!isInStock} onClick={() => handleAddCart(book)}>
              הוסף לעגלה <ShoppingCartIcon />
            </Button>
          )}
        </Card>
      </Grid>
    </>
  );
};

export default BookGrid;
