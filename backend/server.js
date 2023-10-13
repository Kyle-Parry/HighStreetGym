import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

const port = 8080;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

import userController from "./controllers/users.js";
app.use("/users", userController);

import bookingController from "./controllers/bookings.js";
app.use("/bookings", bookingController);

import classController from "./controllers/classes.js";
app.use("/classes", classController);

import blogController from "./controllers/blog.js";
app.use("/blog", blogController);

app.listen(port, () => {
  console.log("Express started on http://localhost:" + port);
});
