import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteLesson } from "../utils/LessonUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from '@mui/icons-material/Delete';

export const LessonGrid = ({ lesson, index, setOpen, setSelectedLesson,setIsNewLesson }) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { lessonName, lessonData } = lesson;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/vod", { state: lesson });
  };

  const handelDeleteLesson = async () => {
    try {
      await deleteLesson(lesson.lessonId).then((res) => {
        alert("המחיקה בוצעה בהצלחה");
      });
    } catch (error) {
      alert(error);
    }

  };

  const handelClickEditLesson = () => {
    setSelectedLesson(lesson);
    setIsNewLesson(false);
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
          width: "350px",
          p: "10px 40px",
          borderRadius: "10px",
          gap: "",
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
        <iframe
          // onClick={handleClick}
          src={lesson.lessonUrl}
          width="380" height="345"
          // style={{
          //   height: "100%",
          //   width: "100%",
          //   objectFit: "cover",
          // }}
        ></iframe>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>{lessonName}</Typography>
          {oneUser && oneUser.userType === 1 && (
            <>
              <Button onClick={handelDeleteLesson}>
                מחיקה
                <DeleteIcon />
              </Button>
              <Button onClick={handelClickEditLesson} >
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

export default LessonGrid;
