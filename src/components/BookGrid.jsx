import { Box, Button, Card, Grid, Typography } from "@mui/material";
import bamidbar from "../pictures/bamidbar.png";
import { useNavigate } from "react-router-dom";
import { handleAddCart } from "./cartHandle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export const BookGrid = ({ book, index }) => {
  const { bookName, cost, img } = book;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/one-book", { state: book });
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
          src={bamidbar}
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
          <Button onClick={() => handleAddCart(book)}>
            הוסף לעגלה
            <ShoppingCartIcon />
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default BookGrid;
