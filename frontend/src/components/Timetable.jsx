import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthentication } from "../hooks/auth.jsx";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Box, Button } from "@mui/material";

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
    const time = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDate = `${date.toLocaleString("en-GB", {
      weekday: "long",
    })} ${date.getDate()} ${date.toLocaleString("en-GB", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push({
      gymClass: gymClass,
      time: time,
    });
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
          {classesForDate.map(({ gymClass, time }) => (
            <Box
              key={gymClass.classId}
              sx={{ mb: 3, display: "flex", flexWrap: "wrap" }}
            >
              <Box
                sx={{ flex: "1 0 auto", minWidth: "fit-content", mr: 2, mb: 1 }}
              >
                <Typography variant="caption">Class</Typography>
                <Typography>{gymClass.activityName}</Typography>
              </Box>
              <Box
                sx={{ flex: "1 0 auto", minWidth: "fit-content", mr: 2, mb: 1 }}
              >
                <Typography variant="caption">Trainer</Typography>
                <Typography>
                  {gymClass.firstName} {gymClass.lastName}
                </Typography>
              </Box>
              <Box
                sx={{ flex: "1 0 auto", minWidth: "fit-content", mr: 2, mb: 1 }}
              >
                <Typography variant="caption">Time</Typography>
                <Typography>{time}</Typography>
              </Box>
              <Box
                sx={{ flex: "1 0 auto", minWidth: "fit-content", mr: 2, mb: 1 }}
              >
                <Typography variant="caption">Duration</Typography>
                <Typography>{gymClass.activityDur}</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => handleBooking(gymClass.classId)}
                sx={{ flex: "1 0 auto", minWidth: "fit-content", mt: 1 }}
              >
                Book
              </Button>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}
