import { TextField, MenuItem, Box, Grid, Divider } from "@mui/material";
import React, { useState } from "react";
import {
  handleAddBook,
  handleAddFlyer,
  handleAddLesson,
  handleAddTest,
} from "./HandleAdminActions";

export default function Admin() {
  const [action, setAction] = useState("הוסף");

  const handleActionChange = (event) => {
    const value = event.target.value;
    setAction(value);
  };

  const menuItems = [
    {
      name: "ספר",
      fields: [
        "BookName",
        "Describe",
        "Part",
        "BookUrl",
        "Picture",
        "Category",
        "Cost",
      ],
      submit: handleAddBook,
    },
    {
      name: "עלון",
      fields: [
        "ParashatSHavuaId",
        "PublishDate",
        "FlyerUrl",
        "FlyerData",
        "PictureUrl",
        "PictureId",
      ],
      submit: handleAddFlyer,
    },
    {
      name: "video שיעור",
      fields: [
        "LessonName",
        "LessonSubjectId",
        "LessonUrl",
        "LessonData",
        "LessonTypeId",
      ],
      submit: handleAddLesson,
    },
    {
      name: "audio שיעור",
      fields: [
        "LessonName",
        "LessonSubjectId",
        "LessonUrl",
        "LessonData",
        "LessonTypeId",
      ],
      submit: handleAddLesson,
    },
    {
      name: "מאמר שיעור",
      fields: [
        "LessonName",
        "LessonSubjectId",
        "LessonUrl",
        "LessonData",
        "LessonTypeId",
      ],
      submit: handleAddLesson,
    },
    {
      name: "2 הלכות ביום",
      fields: [
        "LessonName",
        "LessonSubjectId",
        "LessonUrl",
        "LessonData",
        "LessonTypeId",
      ],
      submit: handleAddLesson,
    },
    {
      name: "מבחן",
      fields: ["TestDate", "Describe"],
      submit: handleAddTest,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [formData, setFormData] = useState({});

  const handleMenuItemChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedItem(menuItems[selectedIndex]);
    setFormData({}); // Resetting the data when changing the item in the menu
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const textFieldStyle = {
   width:"40%"
  };

  return (
    <div style={{display:"flex", flexDirection:"column"}} >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <TextField
          sx={textFieldStyle}
          select
          label="בחר פעולה"
          value={action}
          onChange={handleActionChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="הוסף">הוסף</MenuItem>
          <MenuItem value="ערוך">ערוך</MenuItem>
          <MenuItem value="מחק">מחק</MenuItem>
        </TextField>
        <TextField
          sx={textFieldStyle}
          select
          label="בחר פריט"
          value={selectedItem.name}
          onChange={handleMenuItemChange}
          variant="outlined"
          fullWidth
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Divider sx={{margin:"10px"}}/>
      <Grid container sx={{justifyContent:"center" ,margin:"20px",padding:"20px",gap:"10px"}}>
        {selectedItem.fields.map((field, index) => (
          <Grid item xs={3}>
            <TextField
              sx={textFieldStyle}
              key={index}
              label={field}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => handleInputChange(event, field)}
            />
          </Grid>
        ))}
      </Grid>

      <button style={{display:"flex",alignSelf:"center"}} onClick={() => selectedItem.submit(formData)}>אישור</button>
    </div>
  );
}
