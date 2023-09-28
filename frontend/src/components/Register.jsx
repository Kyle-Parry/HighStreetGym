/* eslint-disable no-unused-vars */
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const RegisterPage = () => {
  const register = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={register}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            mt: "20px",
            mb: "70px",
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
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            type="password"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            id="firstName"
            label="First Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            id="phone"
            label="Phone"
            type="number"
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              "input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
          />
          <TextField
            required
            id="address"
            label="Address Line 1"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            id="address-line-two"
            label="Address Line 2"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <FormControl
            required
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              minWidth: "222.4px",
            }}
          >
            <InputLabel id="state-label">State</InputLabel>
            <Select id="state" label="State" labelId="state-label">
              <MenuItem value="QLD">QLD</MenuItem>
              <MenuItem value="NSW">NSW</MenuItem>
              <MenuItem value="VIC">VIC</MenuItem>
              <MenuItem value="SA">SA</MenuItem>
              <MenuItem value="NT">NT</MenuItem>
              <MenuItem value="TAS">TAS</MenuItem>
              <MenuItem value="WA">WA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="post-code"
            label="Post Code"
            type="number"
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              "input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
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
            Register
          </Button>
          <Typography sx={{ pt: "50px", pb: "75px" }}>
            Already a member?{" "}
            <Link href="/" underline="hover">
              Login Here
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
