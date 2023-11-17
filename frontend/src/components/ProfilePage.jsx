/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/auth.jsx";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Required"),
  address: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  postCode: Yup.string()
    .matches(/^[0-9]+$/, "Postcode must be numeric")
    .required("Required"),
});

const ProfilePage = () => {
  const [authenticatedUser] = useAuthentication();
  const formik = useFormik({
    initialValues: {
      userId: authenticatedUser.userId || "",
      email: authenticatedUser.email || "",
      password: "",
      firstName: authenticatedUser.firstName || "",
      lastName: authenticatedUser.lastName || "",
      phone: authenticatedUser.phone || "",
      address: authenticatedUser.address || "",
      addressTwo: authenticatedUser.addressTwo || "",
      state: authenticatedUser.state || "",
      postCode: authenticatedUser.postCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Sending payload:", values);
      try {
        const response = await axios.post(
          "http://localhost:8080/users/profile",
          values
        );

        if (response.data.status === 200) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update the profile.");
        }
      } catch (error) {
        console.error("An error occurred while updating the profile:", error);
        alert("Failed to update the profile.");
      }
    },
  });

  useEffect(() => {
    if (authenticatedUser) {
      formik.setValues({
        userId: authenticatedUser.userId || "",
        email: authenticatedUser.email || "",
        password: "",
        firstName: authenticatedUser.firstName || "",
        lastName: authenticatedUser.lastName || "",
        phone: authenticatedUser.phone || "",
        address: authenticatedUser.address || "",
        addressTwo: authenticatedUser.addressTwo || "",
        state: authenticatedUser.state || "",
        postCode: authenticatedUser.postCode || "",
      });
    }
  }, [authenticatedUser]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            mt: "20%",
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
            Profile
          </Typography>

          <TextField
            required
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="phone"
            label="Phone"
            type="number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
          />
          <TextField
            required
            name="address"
            label="Address Line 1"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            name="addressTwo"
            label="Address Line 2"
            value={formik.values.addressTwo}
            onChange={formik.handleChange}
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
            <Select
              name="state"
              label="State"
              labelId="state-label"
              value={formik.values.state}
              onChange={formik.handleChange}
            >
              <MenuItem value="">Select a State</MenuItem>
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
            name="postCode"
            label="Post Code"
            type="text"
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
            value={formik.values.postCode}
            onChange={formik.handleChange}
            error={formik.touched.postCode && Boolean(formik.errors.postCode)}
            helperText={formik.touched.postCode && formik.errors.postCode}
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: "30px" }}>
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
