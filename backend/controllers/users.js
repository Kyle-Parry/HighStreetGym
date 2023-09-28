import { Router } from "express";
import * as Users from "../models/users.js";

const userController = Router();

userController.get("/:id", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get user by ID not yet implemented",
  });
});

userController.get("/key/:authKey", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get user by authKey not yet implemented",
  });
});

userController.post("/create", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Create user not yet implemented",
  });
});

userController.post("/update", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Update user not yet implemented",
  });
});

userController.post("/delete", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Delete user not yet implemented",
  });
});

export default userController;
