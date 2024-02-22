import { Button, Card, Grid, Typography } from "@mui/material";
import bamidbar from "../../src/pictures/bamidbar.png";
import OneBook from "./OneBook";
import { useNavigate } from "react-router-dom";

export const BookGrid = ({ book, index }) => {
  const { bookName, cost, img } = book;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/one-book", { state: book });
  };
  return (
    <Grid item display={"flex"} flexDirection={"row"} justifyContent={"center"}>
      <Card
        key={index}
        sx={{
          p: "10px 40px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          "&:hover": {
            transform: "scale(1.2)",
            transition: "all 0.6s ease",
            filter: "brightness(0.8)",
          },
        }}
        onClick={handleClick}
      >
        <Typography sx={{ textAlign: "center" }}>{bookName}</Typography>
        <img src={bamidbar} height={"250px"} />
        <Typography sx={{ textAlign: "center" }}>{cost} ₪</Typography>
        <Button>הוסף לעגלה</Button>
      </Card>
    </Grid>
  );
};

export default BookGrid;
