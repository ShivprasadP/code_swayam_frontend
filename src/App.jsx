import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ContactUs from "./component/ContactUs";
import AboutUs from "./component/AboutUs";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Event_Management from "./component/Event_Management/Event_Management";
import Add_New_Events from "./component/Event_Management/Add_New_Events";
import MultiRoleLogin from "./component/MultiRoleLogin";
import Student_Request from "./component/Student_Request/Student_Request";
import CoordinatorList from "./component/Coordinator_Management/CoordinatorList";
import AddCoordinator from "./component/Coordinator_Management/AddCoordinator";
import Bootcamp_Management from "./component/Bootcamp_Management/Bootcamp_Management";
import Add_New_Bootcamp from "./component/Bootcamp_Management/Add_New_Bootcamp";
import AddPS from "./component/ProblemStatement/AddPS";
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
import Activities from "./component/All_Activities/Activities";
import Practice from "./component/Practice/Practice";


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
<<<<<<< HEAD
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


=======
            <Route path="/practice" element={<Practice />} />
            <Route path="/student-requests" element={<Student_Request />} />
            <Route path="/event_management" element={<Event_Management />} />
            <Route path="/add_new_events" element={<Add_New_Events />} />
            <Route
              path="/bootcamp-management"
              element={<Bootcamp_Management />}
            />
            <Route path="/add_new_bootcamp" element={<Add_New_Bootcamp />} />
            <Route path="/problem-statement-management" element={<AddPS />} />
            <Route
              path="/coordinator-management"
              element={<CoordinatorList />}
            />
            <Route path="add-coordinator" element={<AddCoordinator />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
        <Footer />
        {showLogin && <MultiRoleLogin onLoginSuccess={handleLoginSuccess} />}
      </div>
    </Router>
>>>>>>> 6c88e51b68cb6c41e71f7525244d79410446a5fc
  );
};

export default App;
