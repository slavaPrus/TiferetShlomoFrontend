import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ handleChange }) {
  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "3rem",
    backgroundColor: "#F2F2F2",
    borderRadius: "0.25rem",
    width: "100%",
    padding: "0 0.75rem",
    gap: "0.25rem",
  };
  return (
    <Box sx={container}>
      <SearchIcon />
      <InputBase
        sx={{
          display: "flex",
          flexDirection: "row",
          color: "inherit",
          width: "100%",
          boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }

        }}
        placeholder="חיפוש..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Box>
  );
}
