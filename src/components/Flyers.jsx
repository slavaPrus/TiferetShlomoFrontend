import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteFlyer } from "../utils/FlyerUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export const FlyerGrid = ({ setOpen, setSelectedFlyer, setIsNewFlyer }) => {
  const oneUser = useSelector((state) => state.users.oneUser);
  const navigate = useNavigate();
  const [flyers, setFlyers] = useState([]);

  useEffect(() => {
    const fetchFlyers = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'Flyers');
      try {
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              name: itemRef.name,
              url: url,
            };
          })
        );
        setFlyers(urls);
        
      } catch (error) {
        console.error("Error fetching flyers:", error);
      }
    };

    fetchFlyers();
  }, []);

  const handleClick = (flyer) => {
    navigate("/flyer", { state: flyer });
  };

  const handelDeleteFlyer = async (flyerId) => {
    try {
      await deleteFlyer(flyerId).then((res) => {
        alert("המחיקה בוצעה בהצלחה");
        // עדכון הרשימה לאחר המחיקה
        setFlyers((prevFlyers) => prevFlyers.filter(f => f.name !== flyerId));
      });
    } catch (error) {
      alert(error);
    }
  };

  const handelClickEditFlyer = (flyer) => {
    setSelectedFlyer(flyer);
    setIsNewFlyer(false);
    setOpen(true);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {flyers.map((flyer, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card
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
            <iframe
              onClick={() => handleClick(flyer)}
              src={flyer.url}
              title={flyer.name}
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
              <Typography sx={{ textAlign: "center" }}>{flyer.name}</Typography>
              {oneUser && oneUser.userType === 2 && (
                <>
                  <Button onClick={() => handelDeleteFlyer(flyer.name)}>
                    מחיקה
                    {/* <DeleteIcon /> */}
                  </Button>
                  <Button onClick={() => handelClickEditFlyer(flyer)}>
                    עריכה
                    <ModeEditIcon />
                  </Button>
                </>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FlyerGrid;
