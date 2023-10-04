/* eslint-disable no-unused-vars */
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { TextareaAutosize } from "@mui/material";

const CreateBlogPage = () => {
  const postBlog = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={postBlog}
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
            Create Blog
          </Typography>

          <TextField
            required
            id="Title"
            label="Title"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
          />
          <TextareaAutosize
            required
            id="content"
            label="Content"
            minRows={10}
            sx={{
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
              width: "223px",
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
            Post
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateBlogPage;
