import { Router } from "express";
import {
  Users,
  getByEmail,
  updateAuth,
  create,
  getByAuthKey,
} from "../models/users.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userController = Router();

userController.post("/login", async (req, res) => {
  try {
    // Access request body
    const loginData = req.body;

    // Retrieve the user by email
    const user = await getByEmail(loginData.email);

    // Check passwords match
    if (bcrypt.compareSync(loginData.password, user.password)) {
      // Generate a new authKey
      const authKey = uuidv4();

      // Update user record with the new authKey
      user.authKey = authKey;
      await updateAuth(user);
      console.log(user.authKey);
      // Respond with success
      res.status(200).json({
        status: 200,
        message: "User logged in",
        authKey: authKey,
      });
    } else {
      // Respond with invalid credentials
      res.status(400).json({
        status: 400,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      status: 500,
      message: "Database error: " + error.message, // Log the error message
    });
  }
});

userController.post("/logout", (req, res) => {
  const authKey = req.body.authKey;
  console.log(authKey);
  getByAuthKey(authKey)
    .then((user) => {
      user.authKey = null;
      updateAuth(user).then((user) => {
        res.status(200).json({
          status: 200,
          message: "user logged out",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "failed to logout user",
      });
    });
});

userController.get("/:id", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get user by ID not yet implemented",
  });
});

userController.get("/key/:authKey", (req, res) => {
  const authKey = req.params.authKey;

  getByAuthKey(authKey)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: "Get user by authentication key",
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "Failed to get user by authentication key",
      });
    });
});

userController.post("/create", async (req, res) => {
  const { email, password, role, phone, firstName, lastName } = req.body;

  if (!password) {
    return res.status(400).json({
      status: 400,
      message: "Password is required",
    });
  }

  // Hash the password if it isn't already hashed
  let hashedPassword = password;
  if (!password.startsWith("$2a")) {
    hashedPassword = bcrypt.hashSync(password, 10);
  }

  // Create a new user object with hashed password
  const user = Users(
    null,
    email,
    hashedPassword,
    role,
    phone,
    firstName,
    lastName,
    null
  );

  try {
    const result = await create(user);
    res.status(200).json({
      status: 200,
      message: "Created user",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to create user",
    });
  }
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
