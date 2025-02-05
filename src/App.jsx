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
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
    // <Router>
    //   <div className="bg-white">
    //     <Navbar onLoginClick={handleLoginClick} />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/aboutus" element={<AboutUs />} />
    //       <Route path="/contactus" element={<ContactUs />} />
    //       <Route path="/events/category/:category" element={<Home />} />
    //       <Route path="/practice" element={<Practice />} />
    //       <Route path="/event_management" element={<Event_Management />} />
    //       <Route path="/add_new_events" element={<Add_New_Events />} />
    //     </Routes>
    //     <Footer />
    //     {showLogin && <MultiRoleLogin onClose={handleCloseLogin} />}
    //   </div>
    // </Router>

</>
  );
};

export default App;
