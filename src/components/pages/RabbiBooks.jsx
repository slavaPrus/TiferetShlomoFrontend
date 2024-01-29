import React from "react";
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import { Box } from "@mui/material";

export default function RabbiBooks(){
    //js כאן המקום לכתוב קוד 
    return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
      <FilterInput/>
      <SearchInput/>
   </Box>
   )
}
