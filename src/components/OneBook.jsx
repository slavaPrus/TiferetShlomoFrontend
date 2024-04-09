import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import bamidbar from "../pictures/bamidbar.png";
import { Link, useLocation } from 'react-router-dom';


export default function OneBook() {
    const location = useLocation();

    // Access the book object from the state passed in the location object
    const { state: book } = location;
    const { bookName, cost,describe,img ,bookUrl } = book;
    const handleWatchBook = () => {
        window.open(bookUrl, '_blank');
    };


  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}textAlign={"center"}gap={"30px"}>
        <Box maxWidth={"250px"}height={"100%"} display={"flex"} flexDirection={"column"}alignItems={"space-between"} gap={"15px"}>
        <Typography sx={{fontSize:"25px", fontWeight:"800"}}>{bookName}</Typography>
        <Typography sx={{fontSize:"15px", fontWeight:"500"}}>{describe}</Typography>
        <Link variant='contained' onClick={()=>{handleWatchBook()}}>לעיון בספר</Link>
        <Typography sx={{fontSize:"25px", fontWeight:"800",textAlign: "center" }}>{cost} ₪</Typography>
        <Button variant='contained'>הוסף לעגלה</Button>
        </Box>
        <img src={bamidbar} height={"600px"} />
    </Box>
  )
}
