import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarkById } from "../utils/MarkUtil";
import { setMarks } from "../features/markSlice";
import { setOneUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const PrivateArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.oneUser);
  console.log("oneUser", user);
  useEffect(() => {
    let userLocal = localStorage.getItem('user');
    console.log('userLocal ', userLocal)
    if(user == null){
      if(userLocal){
        dispatch(setOneUser(JSON.parse(userLocal)));
      }
      else{
        navigate('/signIn');
      }
    }
    user && getMarks();
  }, [user]);
  const getMarks = async () => {
    try {
      const res = await getMarkById(user.userId);
      dispatch(setMarks(res));
    } catch (error) {
      console.log(error);
    }
  };
  const marks = useSelector((state) => state.marks.Marks);
  return (
    <Box  sx={{direction:"rtl",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h1>שלום {user?.firstName}</h1>
      <Box>מבחנים</Box>
      {console.log("marks", marks)}
      {marks && marks.length > 0 ? (
        marks.map((mark, index) => {
          return (
            <Box key={index+1} sx={{ display: "flex", flexDirection: "row" }}>
              <Typography>
                {index}. שם המבחן: {mark.test.describe}  
              </Typography>
              <Typography> ציון : {mark.markNumber}</Typography>
            </Box>
          );
        })
      ) : (
        <Typography>לא נמצאו נתונים עבורך</Typography>
      )}
    </Box>
  );
};

export default PrivateArea;
