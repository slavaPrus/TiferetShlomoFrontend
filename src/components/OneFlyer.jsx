import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Oneflyer() {
  const location = useLocation();
  const { state: flyer } = location || {};
  
  // Ensure flyer object exists and has the expected properties
  if (!flyer) {
    return <Typography>Invalid flyer data</Typography>;
  }

  const { flyerName, pictureData, flyerUrl } = flyer;
  
  const handleWatchFlyer = () => {
    window.open(flyerUrl, "_blank");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      gap={"30px"}
      width={"100%"}
      height={"100vh"}
    >
      <Box
        width={"80%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"15px"}
      >
        <Typography sx={{ fontSize: "25px", fontWeight: "800" }}>
          {flyerName}
        </Typography>
      </Box>
      <Box
        width={"40%"}
        height={"100%"}
        overflow={"auto"}
      >
        <iframe 
          src="https://firebasestorage.googleapis.com/v0/b/tifertshlomofirebase.appspot.com/o/Flyers%2Fבין%20הזמנים%202%20תשפג.pdf?alt=media" 
          width={"100%"} 
          height={"100%"} 
          title={flyerName} 
          style={{ border: "none" }} 
        />
      </Box>
      
    </Box>
  );
}
