import express from "express";

const port = 8080;
const app = express();

app.use(express.json());

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
