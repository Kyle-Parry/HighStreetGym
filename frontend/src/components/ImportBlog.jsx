/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useAuthentication } from "../hooks/auth.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const ImportBlogPage = (onUploadSuccess) => {
  const fileRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [authenticatedUser] = useAuthentication();
  const importBlog = async (e) => {
    e.preventDefault();

    const file = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("xml-file", file);

    fetch("http://localhost:8080/blog/upload/xml", {
      method: "POST",
      body: formData,
      headers: {
        "X-AUTH-KEY": authenticatedUser.authKey,
      },
    })
      .then((res) => res.json())
      .then((APIResponse) => {
        setStatusMessage(APIResponse.message);
        alert("Upload successful: " + APIResponse.message);

        file.current.value = "";

        if (typeof onUploadSuccess === "function") {
          onUploadSuccess();
        }
      })
      .catch((error) => {
        setStatusMessage("Upload failed - " + error);
        alert("Upload failed: " + error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={importBlog}
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
            Import Blog
          </Typography>
          <TextField
            required
            id="upload"
            type="file"
            accept=".xml"
            inputRef={fileRef}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              if (fileRef.current) {
                fileRef.current.value = "";
              }
            }}
            sx={{ marginTop: "30px" }}
          >
            Clear
          </Button>
          <Button type="submit" variant="contained" sx={{ marginTop: "30px" }}>
            Import
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ImportBlogPage;
