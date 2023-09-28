import { Router } from "express";
import * as Blogs from "../models/blog.js";

const blogController = Router();

blogController.get("/", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get all blog posts not yet implemented",
  });
});

blogController.post("/create", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Create blog post not yet implemented",
  });
});

blogController.post("/update", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Update blog post not yet implemented",
  });
});

blogController.post("/delete", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Delete blog post not yet implemented",
  });
});

export default blogController;
