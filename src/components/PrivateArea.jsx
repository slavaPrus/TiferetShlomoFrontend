import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarkById } from "../utils/MarkUtil";
import { setMarks } from "../features/markSlice";
import { setOneUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import OneTest from "./OneTest"; // Ensure the component name starts with a capital letter

const PrivateArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.oneUser);
  const adminMode = user?.userType === 2;
  const [alert, setAlert] = useState(null); // State to manage alerts

  useEffect(() => {
    let userLocal = localStorage.getItem("user");
    if (!user && userLocal) {
      dispatch(setOneUser(JSON.parse(userLocal)));
    } else if (!userLocal) {
      navigate("/signIn");
    }
    if (user) {
      getMarks();
    }
  }, [user]);

  const getMarks = async () => {
    try {
      const res = await getMarkById(user.userId);
      dispatch(setMarks(res));
    } catch (error) {
      console.log(error);
      setAlert("Error fetching marks");
    }
  };

  const marks = useSelector((state) => state.marks.Marks);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10px"}
      mt={"30px"}
    >
      {alert && (
        <Box
          position="fixed"
          top={"15%"}
          width="100%"
          zIndex={1000}
          display="flex"
          justifyContent="center"
          alignSelf={"center"}
          padding={0}
        >
          {alert}
        </Box>
      )}
      <h1>!שלום {user?.firstName}</h1>

      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width={"80%"}
        padding={"45px"}
      >
        <Typography variant="h4" color={"#0B1365"} fontWeight={"700"}>
          המבחנים שלך
        </Typography>
      </Box>

      <Box
        width={"80%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "space-between",
          rowGap: "50px",
        }}
      >
        {adminMode ? (
          <Typography
            sx={{
              display: "flex",
              alignSelf: "center",
              fontSize: "20px",
              bgcolor: "yellow",
            }}
          >
            מצב מנהל פעיל
          </Typography>
        ) : marks?.length > 0 ? (
          marks.map((mark, index) => (
            <OneTest key={index} mark={mark} /> // Ensure you return the component
          ))
        ) : (
          <Typography
            sx={{
              display: "flex",
              alignSelf: "center",
              fontSize: "20px",
              bgcolor: "yellow",
            }}
          >
            לא נמצאו נתונים עבורך
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PrivateArea;
