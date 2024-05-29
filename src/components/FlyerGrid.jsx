import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteFlyer } from "../utils/FlyerUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import DeleteIcon from "@mui/icons-material/DeleteIcon";


export const FlyerGrid = ({ flyer, index, setOpen, setSelectedFlyer,setIsNewFlyer }) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const { flyerName, pictureData } = flyer;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/flyer", { state: flyer });
  };

  const handelDeleteFlyer = async () => {
    try {
      await deleteFlyer(flyer.flyerId).then((res) => {
        alert("המחיקה בוצעה בהצלחה");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handelClickEditFlyer = () => {
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
        <img
          onClick={handleClick}
          src={`data:image/jpeg;base64,${pictureData}`}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
          }}
          >
          <Typography sx={{ textAlign: "center" }}>{flyerName}</Typography>
          {oneUser && oneUser.userType === 1 && (
            <>
              <Button onClick={handelDeleteFlyer}>
                מחיקה
                {/* <DeleteIcon /> */}
              </Button>
              <Button onClick={handelClickEditFlyer} >
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
