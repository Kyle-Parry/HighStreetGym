import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Page
      </Typography>
      {loading ? (
        <Typography>Loading blog posts...</Typography>
      ) : (
        <List>
          {blogPosts.map((blogPost) => (
            <ListItem key={blogPost.blogId}>
              <ListItemText
                primary={blogPost.title}
                secondary={`Posted by User ID: ${blogPost.userId}, Posted on: ${blogPost.blogDateTime}`}
              />
              <Typography>{blogPost.content}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default BlogPage;
