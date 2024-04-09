import React from "react";
import {Box, Typography } from "@mui/material";
import image from "../pictures/harav_shlomo_korach.jpg";

const AboutUs = () => {
  //js כאן המקום לכתוב קוד
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}alignItems={"center"}margin={"5%"} >
      <h2>עמותת תפארת שלמה</h2>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}gap={"20px"}>
        <img src={image} alt='הרב שלמה קורח זצ"ל' />
        <Typography>
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
