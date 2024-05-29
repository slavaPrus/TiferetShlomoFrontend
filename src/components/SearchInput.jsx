import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

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

  const inputStyle = {
    direction: "rtl",
    display: "flex",
    flexGrow: 1,
    textAlign: "center", // Center the text horizontally
    boxShadow: "none",
    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      display: "flex",
      textAlign: "center",
    },

    ".MuiOutlinedInput-notchedOutline": { border: 0 },
  };

  return (
    <Box sx={container}>
      <TextField
        sx={inputStyle}
        placeholder="חיפוש..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <SearchIcon />
    </Box>
  );
}
