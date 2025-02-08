import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import ContactUs from "./component/contactus";
import AboutUs from "./component/aboutus";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Feedback from "./component/Feedback/Feedback";
import Profile from "./component/Profile/Profile";
import MultiRoleLogin from "./component/MultiRoleLogin";

import Practice from "./component/Practice/Practice";
import EventDetails from "./component/Events/EventDetails";
import Ranking from "./component/Ranking/Ranking";

import Event_Management from "./component/Event_Management/Event_Management";
import Add_New_Events from "./component/Event_Management/Add_New_Events";
import Student_Request from "./component/Student_Request/Student_Request";
import Bootcamp_Management from "./component/Bootcamp_Management/Bootcamp_Management";
import Add_New_Bootcamp from "./component/Bootcamp_Management/Add_New_Bootcamp";
import AddProblemStatement from "./component/ProblemStatement/AddProblemStatement";
import Addtestcase from "./component/Add_TestCases/Addtestcase";

import StudentList from "./component/StudentManagement/StudentList";
import AddStudent from "./component/StudentManagement/AddStudent";

import CoordinatorList from "./component/Coordinator_Management/CoordinatorList";
import AddCoordinator from "./component/Coordinator_Management/AddCoordinator";
import Activities from "./component/All_Activities/Activities";
import FacultyList from "./component/FacultyManagement/FacultyList";
import AddFaculty from "./component/FacultyManagement/AddFaculty";

import AdminDashboard from "./component/Dashboard/AdminDashboard";
import FacultyDashboard from "./component/Dashboard/FacultyDashboard";
import StudentDashboard from "./component/Dashboard/StudentDashboard";

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
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/login" element={<MultiRoleLogin />} />

            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/rank" element={<Ranking />} />

            <Route path="/student-requests" element={<Student_Request />} />
            <Route path="/event_management" element={<Event_Management />} />
            <Route path="/add_new_events" element={<Add_New_Events />} />
            <Route
              path="/bootcamp-management"
              element={<Bootcamp_Management />}
            />
            <Route path="/add_new_bootcamp" element={<Add_New_Bootcamp />} />
            <Route
              path="/problem-statement-management"
              element={<AddProblemStatement />}
            />

            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/student-management" element={<StudentList />} />
            <Route path="/add-student" element={<AddStudent />} />

            <Route path="/add-test-case" element={<Addtestcase />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/activity-management" element={<Activities />} />
            <Route path="/faculty-management" element={<FacultyList />} />
            <Route path="/add-faculty" element={<AddFaculty />} />
            <Route
              path="/coordinator-management"
              element={<CoordinatorList />}
            />
            <Route path="/add-coordinator" element={<AddCoordinator />} />
          </Routes>
        </div>
        <Footer />
        {showLogin && <MultiRoleLogin onLoginSuccess={handleLoginSuccess} />}
      </div>
    </Router>
  );
};

export default App;
