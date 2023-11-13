/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/auth.jsx"; // Adjust the path

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [authenticatedUser] = useAuthentication();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#cfe8fc",
          borderBottom: "0.1px solid #d3d3d3",
          width: "100%",
          zIndex: 2,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, color: "black", fontWeight: "normal" }}
          >
            High Street Gym
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {authenticatedUser && authenticatedUser.role === "admin" && (
              <>
                <ListItem
                  button
                  key="ImportClass"
                  component={Link}
                  to="/ImportClass"
                >
                  <ListItemText primary="Import Class" />
                </ListItem>
              </>
            )}
            {authenticatedUser &&
              (authenticatedUser.role === "admin" ||
                authenticatedUser.role === "user") && (
                <>
                  <ListItem
                    button
                    key="ImportBlog"
                    component={Link}
                    to="/ImportBlog"
                  >
                    <ListItemText primary="Import Blog" />
                  </ListItem>
                </>
              )}
          </List>

          <Divider />

          <div style={{ padding: "1rem" }}>
            <Typography variant="caption" display="block" gutterBottom>
              © 2023 High Street Gym
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Privacy Policy
              </a>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Terms of Service
              </a>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
              </a>
            </Typography>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Header;
