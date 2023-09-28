import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import BottomNavbar from "./components/BottomNavbar";
import Timetable from "./components/Timetable";
import RegisterPage from "./components/Register";

function App() {
  return (
    <div>
      <BottomNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Timetable" element={<Timetable />} />
        <Route path="/Register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
