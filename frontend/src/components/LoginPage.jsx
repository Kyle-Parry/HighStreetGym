/* eslint-disable no-unused-vars */
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import React, { useState, useContext } from "react"; // Make sure you import React
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../hooks/auth";
import { useAuthentication } from "../hooks/auth";

const LoginPage = () => {
  const [authenticatedUser, login, logout] = useAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Retrieve the email and password from your form input fields
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    try {
      // Call the login function from your authentication context to log in the user
      await login(email, password);

      // If login is successful, you can redirect the user to another page
      navigate("/Timetable"); // Make sure you have 'navigate' from 'react-router-dom' available
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, such as displaying an error message
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleLogin} // Use the handleLogin function
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            mt: "20%",
            borderRadius: "25px",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "20%",
              paddingBottom: "15%",
            }}
          >
            High Street Gym
          </Typography>

          <TextField
            required
            id="email"
            label="Email"
            type="email"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <Typography
            variant="p"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "red",
            }}
          ></Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: "30px" }}>
            Login
          </Button>
          <Typography sx={{ pt: "50px" }}>
            Not a member?{" "}
            <Link href="/Register" underline="hover">
              Register Now
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
