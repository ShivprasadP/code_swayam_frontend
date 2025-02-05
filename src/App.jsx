import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ContactUs from "./component/ContactUs";
import AboutUs from "./component/AboutUs";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Practice from "./component/Practice/Practice";
<<<<<<< HEAD
import Student_Request from "./component/Student_Request/Student_Request"
import BootcampPage from "./component/Bootcamp/Boot"
import AddProblemStatement from "./component/Problemstatement/AddPS";
=======
import Event_Management from "./component/Event_Management/Event_Management";
import Add_New_Events from "./component/Event_Management/Add_New_Events";
import MultiRoleLogin from "./component/MultiRoleLogin";

>>>>>>> 09318d4dc8ac2a1481310f4d5da6edac0c1dada7
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="bg-white">
        <Navbar onLoginClick={handleLoginClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/events/category/:category" element={<Home />} />
<<<<<<< HEAD
          <Route path="/practice" element={<Practice />} /> */}
          {/* <Route path="/Event_Management" element={<Event_Management />} />
          <Route path="/Add_New_Events" element={<Add_New_Events />} /> */}
        {/* </Routes>
       
        <BootcampPage/>
        <Footer />
        {/* // this is bootcamp of admin dashboard */}
         <Student_Request />
         < AddProblemStatement/> 
        </div>
      
        
      
=======
          <Route path="/practice" element={<Practice />} />
          <Route path="/event_management" element={<Event_Management />} />
          <Route path="/add_new_events" element={<Add_New_Events />} />
        </Routes>
        <Footer />
        {showLogin && <MultiRoleLogin onClose={handleCloseLogin} />}
      </div>
>>>>>>> 09318d4dc8ac2a1481310f4d5da6edac0c1dada7
    </Router>
  );
};

export default App;
