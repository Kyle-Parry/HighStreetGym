import { Router } from "express";
import * as Bookings from "../models/bookings.js";

const bookingController = Router();

bookingController.get("/:id", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get booking by user ID not yet implemented",
  });
});

bookingController.post("/create", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Create booking not yet implemented",
  });
});

bookingController.post("/delete", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Delete booking not yet implemented",
  });
});

export default bookingController;
