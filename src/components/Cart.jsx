import React, { useEffect, useState } from "react";
import BookGrid from "./BookGrid";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let cartLocal = localStorage.getItem("cartItems");
    let cartBooks = cartLocal == null ? [] : JSON.parse(cartLocal);
    setCartItems(cartBooks);
  }, []);
  useEffect(() => {
    let totalPrice = cartItems.reduce((total, book) => total + book.cost, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);
  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "3rem",
    backgroundColor: "#F2F2F2",
    borderRadius: "0.25rem",
    width: "100%",
    minWidth: "50px",
    padding: "0 0.75rem",
    gap: "0.25rem",
    color: "#0B1365",
    fontWeight: "700",
    textAlign: "center",
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        width={"80%"}
        padding={"45px"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"40%"}
          gap={"10px"}
        >
          <Box sx={container}>
            <Button
              sx={{
                display: "flex",
                width: "100%",
                color: "inherit",
                minWidth: "50px",
                boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }

              }}
            >
              המשך לתשלום
            </Button>
          </Box>
          <Box sx={container}>
            <TextField
              sx={{
                display: "flex",
                flexDirection: "row",
                color: "inherit",
                width: "100%",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              value={`לתשלום ${totalPrice}`}
            ></TextField>
          </Box>
        </Box>
        <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
          עגלה
        </Typography>
      </Box>
      <Grid
        container
        width={"80%"}
        flexWrap={"wrap"}
        sx={{
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "space-between",
          rowGap: "50px",
        }}
      >
        {cartItems.map((book, index) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <BookGrid key={index} book={book} index={index} isCart={true} />
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
