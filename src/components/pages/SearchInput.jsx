import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "@mui/material";

export default function SearchInput({ handleChange }) {
  return (
    <FormControl
    display={"flex"}
      sx={{
        width: 300,
        display: "flex",
        alignSelf: "center",
        height: "60px",
        flexGrow: 1,
        border: "2px solid black",
        borderRadius: "4px",
      }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}sx={{ alignSelf: "center" }}>
        <InputBase
          sx={{
            display: "flex",
            flexDirection: "row",
            color: "inherit",
            width: "100%",
          }}
          placeholder="חיפוש..."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => handleChange(e.target.value)}
        />
        <SearchIcon />
      </Box>
    </FormControl>
  );
}
