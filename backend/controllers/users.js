import { Router } from "express";
import {
  Users,
  getByEmail,
  updateAuth,
  create,
  update,
  getByAuthKey,
  getByID,
  deleteById,
} from "../models/users.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const userController = Router();

userController.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").trim()],
  async (req, res) => {
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
  }
);

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

userController.post(
  "/create",
  auth(["admin"]),
  [
    body("userId").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }).trim(),
    body("phone").isMobilePhone().trim(),
    body("role").notEmpty().trim().escape(),
    body("firstName").notEmpty().trim().escape(),
    body("lastName").notEmpty().trim().escape(),
    body("address").trim().escape(),
    body("addressTwo").trim().escape(),
    body("state").trim().escape(),
    body("postCode").trim().escape(),
  ],
  async (req, res) => {
    const {
      email,
      password,
      role,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
    } = req.body;

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
      address,
      addressTwo,
      state,
      postCode,
      null
    );
    console.log(user);
    try {
      const result = await create(user);
      res.status(200).json({
        status: 200,
        message: "Created user",
        user: result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        status: 500,
        message: "Failed to create user",
      });
    }
  }
);

userController.post(
  "/update",
  auth(["admin"]),
  [
    body("userId").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").optional().isLength({ min: 8 }).trim(),
    body("role").notEmpty().trim().escape(),
    body("phone").isMobilePhone().trim(),
    body("firstName").notEmpty().trim().escape(),
    body("lastName").notEmpty().trim().escape(),
    body("address").trim().escape(),
    body("addressTwo").trim().escape(),
    body("state").trim().escape(),
    body("postCode").trim().escape(),
  ],
  async (req, res) => {
    const {
      userId,
      email,
      password,
      role,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
    } = req.body;

    let hashedPassword = password;
    if (!password.startsWith("$2a")) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }

    const user = Users(
      userId,
      email,
      hashedPassword,
      role,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
      null
    );

    update(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "Updated user",
          user: user,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to update user",
        });
      });
  }
);

userController.post(
  "/register",
  [
    body("userId").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }).trim(),
    body("phone").isMobilePhone().trim(),
    body("firstName").notEmpty().trim().escape(),
    body("lastName").notEmpty().trim().escape(),
    body("address").notEmpty().trim().escape(),
    body("addressTwo").notEmpty().trim().escape(),
    body("state").notEmpty().trim().escape(),
    body("postCode").notEmpty().trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const {
      email,
      password,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
    } = req.body;

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
      "user",
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
      null
    );
    console.log(user);
    try {
      const result = await create(user);
      res.status(200).json({
        status: 200,
        message: "Created user",
        user: result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        status: 500,
        message: "Failed to create user",
      });
    }
  }
);

userController.post(
  "/profile",
  auth(["admin", "user"]),
  [
    body("userId").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").optional().isLength({ min: 8 }).trim(),
    body("phone").isMobilePhone().trim(),
    body("firstName").notEmpty().trim().escape(),
    body("lastName").notEmpty().trim().escape(),
    body("address").trim().escape(),
    body("addressTwo").trim().escape(),
    body("state").trim().escape(),
    body("postCode").trim().escape(),
  ],
  async (req, res) => {
    const {
      userId,
      email,
      password,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
    } = req.body;
    console.log(req.body);

    let hashedPassword = password;
    if (!password.startsWith("$2a")) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }

    const user = Users(
      userId,
      email,
      hashedPassword,
      null,
      phone,
      firstName,
      lastName,
      address,
      addressTwo,
      state,
      postCode,
      null
    );

    update(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "Updated user",
          user: user,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to update user",
        });
      });
  }
);

userController.delete("/:id", auth(["admin"]), (req, res) => {
  const userId = req.params.id;

  deleteById(userId)
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "User deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete user",
      });
    });
});

export default userController;
