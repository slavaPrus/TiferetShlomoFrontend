import React, { useEffect, useState } from "react";
import BookGrid from "./BookGrid";
import { Box, Button } from "@mui/material";
import { handleDeleteBookFromCart } from "./cartHandle";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    let cartLocal = localStorage.getItem("cartItems");
    let cartBooks = cartLocal == null ? [] : JSON.parse(cartLocal);
    setCartItems(cartBooks);
  }, []);

  
  return (
    <>
      <div>Cart</div>
      {cartItems.map((book, index) => {
        return (
          <Box sx={{display:"flex", flexDirection:"column",}}>
            
            <BookGrid key={index} book={book} index={index} />

            <Button sx={{display:"flex",alignSelf:"center"}} onClick={()=>setCartItems(handleDeleteBookFromCart(book))}>הסר מהעגלה</Button>
          </Box>
        );
      })}
    </>
  );
}
