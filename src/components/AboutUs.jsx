import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../pictures/Logo.png";

const AboutUs = () => {
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
        justifyContent={"center"}
        width={"80%"}
        padding={"45px"}
      >
        <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
          עמותת תפארת שלמה
        </Typography>
      </Box>
      <Box
        width={"80%"}
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{ width: "100%", maxWidth: "300px", height: "auto" }}
        />
        <Typography
          sx={{ width: "40%", textAlign: "center", lineHeight: "1.8" }}
        >
          תפארת שלמה נוסדה בשנת תשע"ז על ידי הרב אוריאל צדוק שליט"א נכד מרן
          זצוק"ל. מטרת הארגון הינה: הפצת תורתו ומורשתו של מרן שר התורה פוסק הדור
          רבי שלמה קורח זצוק"ל בעל עריכת שולחן ילקוט חיים ורבה של ב"ב. ביסוס
          מנהגי אבות הוצאת ספרים מבחנים בהלכה שיעורי תורה
        </Typography>
      </Box>
    </Box>
  );
};
export default AboutUs;
