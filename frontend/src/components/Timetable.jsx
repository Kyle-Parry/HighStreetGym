import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthentication } from "../hooks/auth.jsx";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Box, Button, Grid } from "@mui/material";

export default function Timetable() {
  const [gymClasses, setGymClasses] = useState([]);
  const [authenticatedUser] = useAuthentication();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("http://localhost:8080/classes");
        if (response.data.status === 200) {
          setGymClasses(response.data.gymClasses);
        }
      } catch (error) {
        console.error("Error fetching gym classes:", error);
      }
    }

    fetchData();
  }, []);

  const groupedClasses = gymClasses.reduce((acc, gymClass) => {
    const date = new Date(gymClass.classDateTime);
    const formattedDate = `${date.toLocaleString("en-GB", {
      weekday: "long",
    })} ${date.getDate()} ${date.toLocaleString("en-GB", {
      month: "long",
    })} ${date.getFullYear()}`;
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(gymClass);
    return acc;
  }, {});

  async function handleBooking(classId) {
    if (!authenticatedUser) {
      alert("Please log in to book a class.");
      return;
    }

    const userId = authenticatedUser.userId;

    try {
      const response = await Axios.post(
        "http://localhost:8080/bookings/create",
        {
          userId: userId,
          classId: classId,
        }
      );

      if (response.data.status === 200) {
        alert("Booking created successfully!");
      } else {
        alert("Failed to book the class.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to book the class.");
    }
  }

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#cfe8fc",
        p: 3,
        minHeight: "100vh",
        borderRadius: "25px",
        mt: "20%",
        mb: "20%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, mt: 3, textAlign: "center" }}>
        Timetable
      </Typography>
      {Object.entries(groupedClasses).map(([formattedDate, classesForDate]) => (
        <Paper
          key={formattedDate}
          sx={{ p: 3, my: 2, backgroundColor: "white" }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            {formattedDate}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                Class
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                Trainer
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                Time
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                Book Class
              </Typography>
            </Grid>
          </Grid>
          {classesForDate.map((gymClass) => (
            <Grid
              container
              spacing={2}
              key={gymClass.classId}
              sx={{ textAlign: "center", my: 1 }}
            >
              <Grid item xs={3}>
                <Typography>{gymClass.activityName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>
                  {gymClass.firstName} {gymClass.lastName}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{gymClass.activityDur}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  onClick={() => handleBooking(gymClass.classId)}
                >
                  Book
                </Button>
              </Grid>
            </Grid>
          ))}
        </Paper>
      ))}
    </Box>
  );
}
