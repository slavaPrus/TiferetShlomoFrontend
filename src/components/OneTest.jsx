import { Box, Card, Grid, Typography } from "@mui/material";

export const OneTest = ({ mark, index }) => {
  const formattedDate = new Date(mark.test.testDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
 
  return (
    <Grid container spacing={2} justifyContent="center" flexDirection={"column"}>
    <Grid width={"100%"} item xs={12}>
      <Card
        key={index}
        sx={{
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px",
          "&:hover": {
            border: "1px solid #ccc",
            transform: "scale(1.02)",
            transition: "all 0.6s ease",
            filter: "brightness(0.9)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginRight: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: "600",fontSize: "1.3rem", color: "#0B1365", marginBottom: 1 }}
          >
            שם המבחן:  {mark.test.describe}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginRight: 2,
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "2rem", color: "#0B1365" }}>
            {mark.markNumber}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginRight: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: "600",fontSize: "1.3rem", color: "#0B1365", marginBottom: 1 }}
          >
        תאריך המבחן:  {formattedDate}
          </Typography>
        </Box>
                 
      </Card>
    </Grid>
  </Grid>
);
};

export default OneTest;
