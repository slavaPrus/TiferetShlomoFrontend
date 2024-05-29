import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const BookCart = ({ book, index, handleDeleteBookFromCart }) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { bookName, cost, pictureData, stock } = book;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(book.quantity || 1);
  const [isInStock, setIsInStock] = useState(stock > 0);

  useEffect(() => {
    setIsInStock(quantity <= stock);
  }, [quantity, stock]);

  const handleClick = () => {
    navigate("/one-book", { state: book });
  };

  const handleIncreaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        updateCartQuantity(book.bookId, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateCartQuantity(book.bookId, newQuantity);
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

  return (
    <Grid container spacing={2} justifyContent="center" flexDirection={"column"}>
      <Grid width={"100%"} item xs={12}>
        <Card
          key={index}
          sx={{
            width: "100%",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "10px",
            "&:hover": {
              border: "1px solid #ccc",
              transform: "scale(1.02)",
              transition: "all 0.6s ease",
              filter: "brightness(0.9)",
            },
          }}
        >
          <Box
            component="img"
            onClick={handleClick}
            src={pictureData ? `data:image/jpeg;base64,${pictureData}` : bamidbar}
            sx={{
              height: 80,
              width: 80,
              objectFit: "cover",
              cursor: "pointer",
              marginRight: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginRight: 2,
            }}
          >
            <Typography
              sx={{ fontWeight: "600", color: "#0B1365", marginBottom: 1 }}
            >
              {bookName}
            </Typography>
            <Typography sx={{ fontWeight: "600", color: "#0B1365" }}>
              {cost} ₪
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <IconButton onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton onClick={handleIncreaseQuantity} disabled={!isInStock}>
                <AddIcon />
              </IconButton>
            </Box>
            {!isInStock && (
              <Typography sx={{ color: "red", marginBottom: 1 }}>אזל המלאי</Typography>
            )}
            <Button
              variant="contained"
              onClick={() => handleDeleteBookFromCart(book)}
              startIcon={<DeleteIcon />}
            >
              הסר
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookCart;
