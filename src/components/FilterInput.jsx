import { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterInput({ handleChange, categories }) {
  const [categoryName, setCategoryName] = useState("");

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    const currentValue = categoryName === value ? "" : value;
    setCategoryName(currentValue);
    handleChange(currentValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "3rem",
        backgroundColor: "#F2F2F2",
        borderRadius: "0.25rem",
        width: "100%",
        padding: "0 0.75rem",
        gap: "0.25rem",
      }}
    >
      <Select
        displayEmpty
        onChange={handleFilterChange}
        MenuProps={MenuProps}
        value={categoryName}
        sx={{
          "& .MuiSelect-select": {
            textAlign: "center"},
          direction:"rtl",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "3rem",
          backgroundColor: "#F2F2F2",
          borderRadius: "0.25rem",
          width: "100%",
          gap: "0.25rem",
          boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }
        }}
      
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: "#AAA" }}>קטגוריה</span>;
          }
          return selected;
        }}
      >
        <MenuItem disabled value="">
        </MenuItem>
        {categories.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
