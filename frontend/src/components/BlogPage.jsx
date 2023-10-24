/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Grid,
} from "@mui/material";

function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the blog posts from your API
    axios
      .get("http://localhost:8080/blog")
      .then((response) => {
        setBlogPosts(response.data.blogPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component="div"
        sx={{
          backgroundColor: "#cfe8fc",
          p: 3,
          borderRadius: "25px",
          mt: "20%",
          mb: "20%",
          width: "80%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, mt: 3, textAlign: "center" }}>
          Blog Page
        </Typography>
        {loading ? (
          <Typography>Loading blog posts...</Typography>
        ) : (
          blogPosts.map((blogPost) => (
            <Paper
              key={blogPost.blogId}
              sx={{ p: 3, my: 2, backgroundColor: "white" }}
            >
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {blogPost.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "center" }}>
                    Posted by {blogPost.firstName} {blogPost.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "center" }}>
                    Posted on: {blogPost.blogDateTime}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {blogPost.content}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
}

export default BlogPage;
