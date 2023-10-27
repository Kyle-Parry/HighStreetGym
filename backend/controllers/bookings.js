import { Router } from "express";
import { Bookings, getByID, create, deleteById } from "../models/bookings.js";
import auth from "../middleware/auth.js";

const bookingController = Router();

bookingController.get("/:id", auth(["admin", "user"]), async (req, res) => {
  const userId = req.params.id;

  try {
    const booking = await getByID(userId);

    if (!booking) {
      res.status(404).json({
        status: 404,
        message: "Booking not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Get booking by ID",
        booking: booking,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get booking by ID",
    });
  }
});

bookingController.post("/create", auth(["admin", "user"]), async (req, res) => {
  const { userId, classId } = req.body;

  const booking = Bookings(null, userId, classId);
  console.log(booking);
  try {
    const result = await create(booking);
    res.status(200).json({
      status: 200,
      message: "Created booking",
      user: result,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to create booking",
    });
  }
});

bookingController.post("/delete/:id", auth(["admin", "user"]), (req, res) => {
  const bookingId = req.params.id;

  deleteById(bookingId)
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "booking deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete booking" + error,
      });
    });
});

export default bookingController;
