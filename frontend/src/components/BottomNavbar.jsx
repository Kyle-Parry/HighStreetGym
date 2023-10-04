/* eslint-disable no-unused-vars */
import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  return (
    <Box
      sx={{
        "& .MuiBottomNavigation-root": {
          bgcolor: "#cfe8fc",
          borderTop: "0.1px solid #d3d3d3",
        },
        width: 500,
      }}
    >
      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
        elevation={3}
        showLabels
        value={activePath}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          label="Timetable"
          value="/Timetable"
          icon={<CalendarMonthIcon />}
        />
        {loggedIn && (
          <BottomNavigationAction
            label="Bookings"
            value="/Bookings"
            icon={<FormatListBulletedIcon />}
          />
        )}
        <BottomNavigationAction
          label="Blog"
          value="/Blog"
          icon={<CommentIcon />}
        />
        {loggedIn && (
          <BottomNavigationAction
            label="Profile"
            value="/Profile"
            icon={<AccountBoxIcon />}
          />
        )}
        <BottomNavigationAction
          label={loggedIn ? "Logout" : "Login"}
          value="/"
          icon={loggedIn ? <LogoutIcon /> : <LoginIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
