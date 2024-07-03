import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteFlyer } from "../utils/FlyerUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import PdfView from "./PdfView";

export const FlyerGrid = ({
  flyer,
  index,
  setOpen,
  setSelectedFlyer,
  setIsNewFlyer,
}) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { parashatShavuaDescribe, flyerUrl } = flyer;
  const navigate = useNavigate();
  console.log(flyer, "flyer");

  const handleClick = () => {
    navigate("/one-flyer", { state: flyer });
  };

  const handleDeleteFlyer = async () => {
    try {
      await deleteFlyer(flyer.flyerId).then((res) => {
        alert("המחיקה בוצעה בהצלחה");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleClickEditFlyer = () => {
    setSelectedFlyer(flyer);
    setIsNewFlyer(false);
    setOpen(true);
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
        <Typography
          sx={{ textAlign: "center", fontWeight: "600", color: "#0B1365" }}
        >
          {parashatShavuaDescribe}
        </Typography>
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
          onClick={handleClick}
        >
          <PdfView pdfUrl={flyerUrl} />
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {oneUser && oneUser.userType === 2 && (
            <>
              <Button onClick={handleDeleteFlyer}>מחיקה</Button>
              <Button onClick={handleClickEditFlyer}>
                עריכה
                <ModeEditIcon />
              </Button>
            </>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default FlyerGrid;
