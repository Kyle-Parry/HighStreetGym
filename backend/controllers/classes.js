import { Router } from "express";
import * as Classes from "../models/classes.js";

const classController = Router();

classController.get("/", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get all classes not yet implemented",
  });
});

classController.get("/:id", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get class by ID not yet implemented",
  });
});

classController.post("/create", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Create class not yet implemented",
  });
});

classController.post("/update", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Update class not yet implemented",
  });
});

classController.post("/delete", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Delete class not yet implemented",
  });
});

export default classController;
