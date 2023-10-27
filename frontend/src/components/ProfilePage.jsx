/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/auth.jsx";
import axios from "axios";
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

const ProfilePage = () => {
  const [authenticatedUser, ,] = useAuthentication();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    addressTwo: "",
    state: "",
    postCode: "",
    userId: authenticatedUser.userId,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (authenticatedUser) {
      setFormData({
        email: authenticatedUser.email || "",
        password: "",
        firstName: authenticatedUser.firstName || "",
        lastName: authenticatedUser.lastName || "",
        phone: authenticatedUser.phone || "",
        address: authenticatedUser.address || "",
        addressTwo: authenticatedUser.addressTwo || "",
        state: authenticatedUser.state || "",
        postCode: authenticatedUser.postCode || "",
        userId: authenticatedUser.userId,
      });
    }
  }, [authenticatedUser]);

  async function updateProfile(e) {
    e.preventDefault();
    console.log("Sending payload:", formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/users/profile",
        formData
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
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={updateProfile}
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
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="password"
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="firstName"
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="lastName"
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="phone"
            id="phone"
            label="Phone"
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            required
            name="address"
            id="address"
            label="Address Line 1"
            value={formData.address}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextField
            name="addressTwo"
            id="addressTwo"
            label="Address Line 2"
            value={formData.addressTwo}
            onChange={handleInputChange}
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
              id="state"
              label="State"
              labelId="state-label"
              value={formData.state}
              onChange={handleInputChange}
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
            id="postCode"
            label="Post Code"
            type="number"
            value={formData.postCode}
            onChange={handleInputChange}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
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
