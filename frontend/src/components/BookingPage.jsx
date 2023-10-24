import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthentication } from "../hooks/auth.jsx";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [authenticatedUser] = useAuthentication();

  useEffect(() => {
    async function fetchData() {
      const userId = authenticatedUser.userId;
      try {
        const response = await Axios.get(
          `http://localhost:8080/bookings/${userId}`
        );
        if (response.data.status === 200) {
          setBookings(response.data.booking);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchData();
  }, [authenticatedUser]);

  async function handleCancelBooking(bookingId) {
    try {
      const response = await Axios.post(
        `http://localhost:8080/bookings/delete/${bookingId}`
      );

      if (response.data.status === 200) {
        alert("Booking cancelled successfully!");
        setBookings(bookings.filter((b) => b.bookingId !== bookingId)); // remove the cancelled booking from state
      } else {
        alert("Failed to cancel the booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel the booking.");
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
        Bookings
      </Typography>
      {bookings.map((booking) => {
        const date = new Date(booking.classDateTime);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear().toString().substr(-2)}`;

        return (
          <Paper
            key={booking.bookingId}
            sx={{ p: 3, my: 2, backgroundColor: "white" }}
          >
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Class
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {booking.activityName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Location
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {booking.locationName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Date
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {formattedDate}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancelBooking(booking.bookingId)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
}
