import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import BottomNavbar from "./components/BottomNavbar";
import Timetable from "./components/Timetable";
import RegisterPage from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import ImportClassPage from "./components/ImportClassPage";
import CreateBlogPage from "./components/CreateBlogPage";

function App() {
  return (
    <div>
      <BottomNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Timetable" element={<Timetable />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Import" element={<ImportClassPage />} />
        <Route path="/Create-Blog" element={<CreateBlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
