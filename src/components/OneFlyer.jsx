import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import PdfView from "./PdfView";

export default function Oneflyer() {
  const location = useLocation();
  const { state: flyer } = location || {};

  // Ensure flyer object exists and has the expected properties
  if (!flyer) {
    return <Typography>Invalid flyer data</Typography>;
  }

  const { parashatShavuaDescribe, flyerUrl } = flyer;

  
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
          {parashatShavuaDescribe}
        </Typography>
      </Box>
      <Box width={"80%"} height={"100%"} overflow={"auto"}>
        <PdfView pdfUrl={flyerUrl} />
      </Box>
    </Box>
  );
}
