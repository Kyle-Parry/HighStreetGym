/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Paper, Typography, Grid, Container } from "@material-ui/core";

const BookingPage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user bookings by ID
    axios
      .get(`/api/booking/user/${id}`)
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings:", error);
      });
  }, [id]);

  const handleCancelBooking = (bookingId) => {
    // Send a DELETE request to cancel the booking
    axios
      .delete(`http://localhost:8080/bookings/delete/${bookingId}`)
      .then((response) => {
        // Refresh the booking list
        const updatedBookings = bookings.filter(
          (booking) => booking.bookingId !== bookingId
        );
        setBookings(updatedBookings);
      })
      .catch((error) => {
        console.error("Failed to cancel booking:", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid item key={booking.bookingId} xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                {booking.activityName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Location: {booking.locationName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Class Date and Time: {booking.classDateTime}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelBooking(booking.bookingId)}
              >
                Cancel Booking
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookingPage;
