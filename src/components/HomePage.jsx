import { Box } from "@mui/material";
import React from "react";
import image1 from "../pictures/image1.jpg";

const HomePage = () => {
  const style = {
    bgcolor: "blue",
    height: "150px",
    width: "120px",
    borderRadius: "25px",
  };
  //js כאן המקום לכתוב קוד
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-around"}
      alignContent={"space-around"}
      padding="5px"
      margin={"5px"}
      bgcolor={"divider"}
    >
      <Box sx={style}></Box>
      <Box sx={style}></Box>
      <Box sx={style}></Box>
      <Box sx={style}></Box>
    </Box>
  );
};
export default HomePage;
