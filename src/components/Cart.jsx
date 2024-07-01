import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogTitle, Grid, Snackbar, TextField, Typography } from "@mui/material";
import BookCart from "./BookCart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const cartLocal = localStorage.getItem("cartItems");
    const cartBooks = cartLocal ? JSON.parse(cartLocal) : [];
    setCartItems(cartBooks);
    const totalPrice = cartBooks.reduce(
      (total, book) => total + book.cost * book.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, []);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, book) => total + book.cost * book.quantity,
      0
    );
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

  const handleDeleteBookFromCart = (bookToRemove) => {
    const updatedCartItems = cartItems.filter(
      (book) => book.bookId !== bookToRemove.bookId
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setAlert(<Alert variant="filled" sx={{ width: "80%" }} severity="success">הספר נמחק מהעגלה</Alert>);
    setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds
  };

  const handleConfirm = () => {
    setAlert({ open: true, severity: "success", message: `${name}, הזמנתך התקבלה.ניצור קשר בהקדם לסיום התהליך בטלפון ${phone}.` });









    setOpen(false);
  };
  const handleCloseAlert = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          variant="filled"
          sx={{ width: "80%" }}
          onClose={handleCloseAlert}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>      
      <Dialog
        open={open}
        PaperProps={{
          sx: { padding: "30px", dir: 'rtl' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
          להשלמת ההזמנה הכנס את הפרטים הבאים
        </DialogTitle>
        <Box sx={{ display: 'flex', padding: '20px', gap: '10px' }}>
          <TextField
            id="name"
            label="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="phone"
            label="טלפון ליצירת קשר"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Button onClick={handleConfirm}>אישור</Button>
        <Button onClick={() => setOpen(false)}>ביטול</Button>
      </Dialog>
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
              onClick={() => { setOpen(true) }}
              sx={{
                display: "flex",
                width: "100%",
                color: "inherit",
                minWidth: "50px",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
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
                textAlign: "center",
                ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                  display: "flex",
                  textAlign: "center",
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              value={`לתשלום ${totalPrice}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
        <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
          עגלה
        </Typography>
      </Box>
      <Grid
        container
        width={"80%"}
        flexDirection={"column"}
        sx={{
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "space-between",
          rowGap: "50px",
        }}
      >
        {cartItems.map((book, index) => (
          <Box sx={{ display: "flex", flexDirection: "column" }} key={index}>
            <BookCart
              handleDeleteBookFromCart={handleDeleteBookFromCart}
              book={book}
              index={index}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
