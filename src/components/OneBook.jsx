import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import bamidbar from "../../src/pictures/bamidbar.png";
import { useLocation } from 'react-router-dom';


export default function OneBook() {
    const location = useLocation();

    // Access the book object from the state passed in the location object
    const { state: book } = location;
    const { bookName, cost, img ,bookUrl } = book;
    const handleWatchBook = () => {
        window.open(bookUrl, '_blank');
    };


  return (
    <Box textAlign={"center"}>
        <Typography >{bookName}</Typography>
        <img src={bamidbar} height={"250px"} />
        <Typography sx={{ textAlign: "center" }}>{cost} ₪</Typography>
        <Button>הוסף לעגלה</Button>
        <Button onClick={()=>{handleWatchBook()}}>לעיון בספר</Button>
    </Box>
  )
}
