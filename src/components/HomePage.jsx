import { Box, Typography } from "@mui/material";
import React from "react";
import image1 from "../pictures/mishne_tora.jpg";
import image2 from "../pictures/kitzur_arichat_shulchan.jpg";
// import image3 from "../pictures/ani_maamin.png";
import image4 from "../pictures/ribon_haolamim.jpg";

const HomePage = () => {
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
        justifyContent={"center"}
        width={"80%"}
        padding={"45px"}
      >
        <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
          !ברוכים הבאים לתפארת שלמה
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        flexWrap={"wrap"}
        sx={{
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "center",
          rowGap: "50px",
        }}
      >
        <Box width={"90%"}>
          <img
            alt="משנה תורה"
            src={image1}
            style={{ borderRadius: "25px", display: "flex", width: "100%" }}
          />
        </Box>
        <Box width={"90%"}>
          <img
            alt="קיצור עריכת שולחן"
            src={image2}
            style={{ borderRadius: "25px", display: "flex", width: "100%" }}
          />
        </Box>
        <Box width={"90%"}>
          <img
            alt="ריבון העולמים"
            src={image4}
            style={{ borderRadius: "25px", display: "flex", width: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default HomePage;
