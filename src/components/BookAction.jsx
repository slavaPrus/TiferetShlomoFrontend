import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { handleAddCart, handleDecreaseQuantity } from "./BookFunc";

export default function BookAction({ book, setAlert }) {
  const [cartItems, setCartItems] = useState(() => {
    const cartLocal = localStorage.getItem("cartItems");
    return JSON.parse(cartLocal) || [];
  });
  const [isInStock] = useState(book.stock > 0);
  const [quantity, setQuantity] = useState(
    cartItems.find((item) => item.bookId === book.bookId)?.quantity || 0
  );

  return (
    <>
      {!isInStock && (
        <Typography sx={{ color: "red", marginBottom: 1 }}>
          אזל המלאי
        </Typography>
      )}
      {quantity === 0 ? (
        <Button
          disabled={!isInStock}
          onClick={() => handleAddCart(book, setAlert, cartItems, setCartItems)}
        >
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
            onClick={() => {
              handleDecreaseQuantity(
                book,
                quantity,
                setAlert,
                cartItems,
                setCartItems
              );
              setQuantity(quantity - 1);
            }}
            disabled={quantity < 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 2 }}>{quantity}</Typography>
          <IconButton
            onClick={() => {
              handleAddCart(book, setAlert, cartItems, setCartItems);
              setQuantity(quantity + 1);
            }}
            disabled={quantity >= book.stock}
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
