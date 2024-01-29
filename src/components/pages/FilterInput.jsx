import {useEffect, useState} from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getAllBooks } from "../../utils/BookUtil";
import { setBooks } from "../../features/bookSlice";
import { useDispatch } from 'react-redux';



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

const categoriesName = ["הלכה", " מוסר", "אמונה וביטחון"];
function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
    categoryName.indexOf(name) === -1
    ? theme.typography.fontWeightRegular
    : theme.typography.fontWeightMedium,
  };
}

export default function FilterInput() {
  const dispatch=useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your asynchronous function here, for example getAllBooks
        const res = await getAllBooks();
        dispatch(setBooks(res.data))
        // Other logic after the async function completes
      } catch (error) {
        // Handle errors if necessary
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the async function immediately
    fetchData();
  }, []);
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">קטגוריה</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          multiple
        >
          {categoriesName.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, categoryName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
