import React, { useState } from "react";
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
import EventRouting from "./component/Events/EventRouting";
import UnlockCareer from "./component/Home_Body";
import Feedback from "./component/Feedback/Feedback";
import AddProblemStatement from "./component/Problemstatement/AddPS";
import StudentProfile from "./component/Student_Profile/student_profile";
import BootcampPage from "./component/Bootcamp/Boot";
import Compiler from "./component/Code_compiler/Compiler";



const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <>
    {/* <Compiler/> */}

     //{" "}
      <>
      <Router>
        <Navbar onLoginClick={handleLoginClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<MultiRoleLogin />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/events/category/:category" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/event_management" element={<Event_Management />} />
          <Route path="/add_new_events" element={<Add_New_Events />} />
        </Routes>
        <Footer />
      </Router> 
      {/* <AddProblemStatement/>
      <StudentProfile/>
      <BootcampPage/> */} 
   
      {/* <Feedback/> FEedback page at student dashboard */}
      </>
      </>
     
   
  );
};

export default App;
