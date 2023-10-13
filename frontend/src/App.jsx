import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import BottomNavbar from "./components/BottomNavbar";
import Timetable from "./components/Timetable";
import RegisterPage from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import ImportClassPage from "./components/ImportClassPage";
import ImportBlogPage from "./components/ImportBlog";
import { RestrictedRoute } from "./components/RestrictedRoute";
import BookingPage from "./components/BookingPage";
import BlogPage from "./components/BlogPage";

function App() {
  return (
    <div>
      <BottomNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />

        <Route
          path="/Timetable"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <Timetable />
            </RestrictedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <ProfilePage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/Bookings"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <BookingPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/Blog"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <BlogPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="/ImportClass"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <ImportClassPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/ImportBlog"
          element={
            <RestrictedRoute allowedRoles={["admin", "user"]}>
              <ImportBlogPage />
            </RestrictedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
