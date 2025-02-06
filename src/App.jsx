import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ContactUs from "./component/ContactUs";
import AboutUs from "./component/AboutUs";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Practice from "./component/Practice/Practice";
import Event_Management from "./component/Event_Management/Event_Management";
import Add_New_Events from "./component/Event_Management/Add_New_Events";
import MultiRoleLogin from "./component/MultiRoleLogin";
import Student_Request from "./component/Student_Request/Student_Request";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import FacultyDashboard from "./component/Dashboard/FacultyDashboard";
import StudentDashboard from "./component/Dashboard/StudentDashboard";
import EventRouting from "./component/Events/EventRouting";
import UnlockCareer from "./component/Home_Body";
import Feedback from "./component/Feedback/Feedback";
import AddProblemStatement from "./component/Problemstatement/AddPS";
import StudentProfile from "./component/Student_Profile/student_profile";
import BootcampPage from "./component/Bootcamp/Boot";
import Compiler from "./component/Code_compiler/Compiler";



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="bg-white">
        <Navbar onLoginClick={handleLoginClick} user={user} />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<MultiRoleLogin />} />
            <Route path="/events/category/:category" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/student-requests" element={<Student_Request />} />
            <Route path="/event_management" element={<Event_Management />} />
            <Route path="/add_new_events" element={<Add_New_Events />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
        <Footer />
        {showLogin && <MultiRoleLogin onLoginSuccess={handleLoginSuccess} />}
      </div>
    </Router>
  );
};

export default App;
