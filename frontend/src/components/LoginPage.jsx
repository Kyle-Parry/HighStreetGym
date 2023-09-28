/* eslint-disable no-unused-vars */
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const LoginPage = () => {
  const login = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={login}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            mt: "10%",
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