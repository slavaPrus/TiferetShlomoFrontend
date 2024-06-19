import React from "react";
import { Box, Typography } from "@mui/material";

const HalachaTests = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
      direction="rtl"
    >
      <Box display="flex" justifyContent="center" width="80%" padding="45px">
        <Typography
          variant="h4"
          color="#0B1365"
          fontWeight="700"
          textAlign="center"
        >
          מבחנים בהלכה
        </Typography>
      </Box>
      <Box
        width="80%"
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          border: "2px solid #e3e2e2",
          borderRadius: "35px 35px 0 0",
          p: "70px",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            width: "92%",
            p: "35px",
            borderRadius: "15px",
            bgcolor: "divider",
          }}
        >
          <Typography variant="h6" textAlign="center">
           <b> כי הם חיינו</b>
          </Typography>
          <Typography variant="subtitle1" textAlign="center" lineHeight="1.8">
            המיזם לחיזוק לימוד ההלכה לבחורי ישיבות גדולות/ קטנות מתוך הספר
            "קיצור עריכת שולחן – ילקוט חיים"
            <br />
            למרן שר התורה מעתיק השמועה פוסק הדור רבי שלמה קורח זצוק"ל
            <br />
            שע"י ארגון "תפארת שלמה"
          </Typography>
        </Box>
        <Typography
          sx={{ textAlign: "right", direction: "rtl", lineHeight: "1.8" }}
        >
          מספר הודעות ללומדי התוכנית:
          <br /><br />
          1. בעז"ה יערכו מבחנים סביב מעגל השנה חגים ומועדים מתוך ספר "קיצור
          עריכת השולחן ילקוט חיים". בסדר לימוד זה יסודר לפניך כל ההלכות הנוגעות
          למעשה לכל חג ומועד, לנוהגים כהרמב"ם והמהרי"ץ, ולנוהגים כשולחן ערוך
          והשתילי זיתים, בתוספת כל המנהגים וחידושי הלכות אקטואליות עד זמנינו
          לאור פסקי רבותינו. לתשומת לב הלומדים בסוף הספר הובאו מספרי מרן זצוק"ל
          דברי מוסר ויראת ה' על כל חג ומועד.
          <br />
          2. המעוניין להיות נציג בישיבה, יקבל מלגה נוספת. ליצירת קשר: 0527635158
          <br />
          3. יש להתעדכן במס' טלפון של הארגון 03-3065505
          <br />
          4. ציון למעלה מ-80% מזכה במלגה של 100 ₪
          <br />
          5. יש להחזיר את המבחן לנציגים - מייל: ts0548451734@gmail.com / פקס:
          03-6187167
          <br />
          6. נא לוודא שהמבחן שהוגש הגיע למערכת הארגון.
          <br />
          7. יש לעשות את המבחן בספר סגור בלבד.
          <br />
          8. הלומדים שיעיינו להרחיב ולהעמיק את הנושא הנלמד מתוך הספר "עריכת
          השולחן ילקוט חיים" המורחב ויציינו זאת במבחן, יכנסו להגרלות נוספות על
          ספרים, פרטים בהמשך.
          <br />
          9. לשאלות הבנה בהספק הנלמד לכל חידוש והארה ניתן להתקשר:
          <br />
          הרב אוריאל צדוק – 0548451734, הרב מרדכי צדוק – 0533114685, הרב יהודה
          צדוק – 0556746581
          <br />
          <br />
        </Typography>
        <Box
          sx={{
            width: "92%",
            p: "35px",
            borderRadius: "15px",
            bgcolor: "divider",
          }}
        >
          <Typography
            sx={{ textAlign: "center", direction: "rtl", lineHeight: "1.8" }}
          >
            <b>ההספק מתוך ספר קיצור עריכת שולחן ילקוט חיים</b>
            <br />
            הלכות חנוכה - מעמ' רנ"ז - עמ' רס"ו.
            <br />
            הלכות ראש חודש וברכת הלבנה - מעמ' רצ"א - עמ' רצ"ז.
            <br />
            <b>זמן המבחן</b> - כ"ה כסלו עד סוף ימי החנוכה תש"פ".
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HalachaTests;
