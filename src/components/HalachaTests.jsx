import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';

const HalachaTests = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  // const handleUpload = () => {
  //   const storageRef = ref(storage, `images/${image.name}`);
  //   uploadBytes(storageRef, image).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setUrl(url);
  //       // שמירת ה-URL במסד הנתונים
  //       axios.post('/api/save-image-url', { url })
  //         .then(response => {
  //           console.log('Image URL saved successfully:', response);
  //         })
  //         .catch(error => {
  //           console.error('Error saving image URL:', error);
  //         });
  //     });
  //   });
  // };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"5%"} direction={"rtl"}>
        <h2 style={{ fontFamily: "David, sans-serif", fontSize: "24px", fontWeight: "bold", color: "#333" }}>מבחנים בהלכה</h2>
        <h3>"כי הם חיינו"</h3>
        <h4>המיזם לחיזוק לימוד ההלכה לבחורי ישיבות גדולות/ קטנות מתוך הספר "קיצור עריכת שולחן – ילקוט חיים"
          למרן שר התורה מעתיק השמועה פוסק הדור רבי שלמה קורח זצוק"ל
          שע"י ארגון "תפארת שלמה"</h4>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"} gap={"20px"}>
          <Typography style={{ textAlign: "right", direction: "rtl" }}>
            מס' הודעות ללומדי התוכנית:
            <Typography />
            1 . בעז"ה יערכו מבחנים סביב מעגל השנה חגים ומועדים מתוך ספר " קיצור עריכת השולחן ילקוט חיים" . בסדר לימוד זה יסודר לפניך כל ההלכות הנוגעות למעשה לכל חג
            ומועד, לנוהגים כהרמב"ם והמהרי"ץ, ולנוהגים כשולחן ערוך והשתילי זיתים, בתוספת כל המנהגים וחידושי הלכות אקטואליות עד זמנינו לאור פסקי רבותינו.
            לתשומת לב הלומדים בסוף הספר הובאו מספרי מרן זצוק"ל דברי מוסר ויראת ה' על כל חגומועד.
            <Typography />
            2 .המעוניין להיות נציג בישיבה, יקבל מלגה נוספת. ליצירת קשר: 0527635158
            <Typography />
            3 .יש להתעדכן במס' טלפון של הארגון 3065505–03
            <Typography />
            4 .ציון למעלה מ – 80% מזכה במלגה של 100 ₪
            <Typography />
            5 .יש להחזיר את המבחן לנציגים -
            ts0548451734@gmail.com : מייל / 03-6187167 -פקס
            <Typography />
            6 .נא לוודא שהמבחן שהוגש הגיע למערכת הארגון.
            <Typography />
            7 .יש לעשות את המבחן בספר סגור בלבד.
            <Typography />
            8. הלומדים שיעיינו להרחיב ולהעמיק את הנושא הנלמד מתוך הספר " עריכת השולחן ילקוט חיים" המורחב ויציינו זאת במבחן, יכנסו להגרלות נוספות על ספרים, פרטים
            בהמשך.
            <Typography />
            9. לשאלות הבנה בהספק הנלמד לכל חידוש והארה ניתן להתקשר: הרב אוריאל צדוק – 0548451734 הרב מרדכי צדוק – 0533114685
            הרב יהודה צדוק 0556746581-
            ההספק מתוך ספר קיצור עריכת שולחן ילקוט חיים
            הלכות חנוכה - מעמ' רנ"ז - עמ' רס"ו
            הלכות ראש חודש וברכת הלבנה - מעמ' - רצ"א - עמ' רצ"ז
            זמן המבחן - כ"ה כסלו עד סוף ימי החנוכה תשפ"
          </Typography>
        </Box>
        {/* <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} marginTop={"20px"}>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
          {url && <img src={url} alt="Uploaded" style={{ marginTop: "20px", maxHeight: "300px" }} />}
        </Box> */}
      </Box>
    </>
  );
}

export default HalachaTests;
