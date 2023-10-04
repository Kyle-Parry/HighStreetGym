/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const ImportClassPage = () => {
  const importClass = async (e) => {
    e.preventDefault();
  };
  const file = useRef(null);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={importClass}
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
            Import Class
          </Typography>
          <TextField
            required
            id="upload"
            type="file"
            accept=".xml"
            inputRef={file}
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              if (file.current) {
                file.current.value = "";
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

export default ImportClassPage;
