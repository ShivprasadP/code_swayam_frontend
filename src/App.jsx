import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Contactus from "./component/contactus";
import Aboutus from "./component/aboutus";
import Home from "./component/home";
import Footer from "./component/footer";
import EventRouting from "./component/Events/EventRouting";
import Practice from "./component/Practice/Practice";
import BootcampPage from "./component/Bootcamp/Boot";
import AddProblemStatement from "./component/Problemstatement/AddPS";
const App = () => {
  return (
    <Router>
      <div className="bg-white">
        <Header />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/events/category/:category" element={<Home />} />
          <Route path="/practice" element={<Practice />} /> */}
          {/* <Route path="/Event_Management" element={<Event_Management />} />
          <Route path="/Add_New_Events" element={<Add_New_Events />} /> */}
        {/* </Routes>
        <Student_Request />
        <Event_Management />
        <Add_New_Events />
        <Footer /> */}
        {/* // this is bootcamp of admin dashboard */}
        {/* <BootcampPage/>      */}
         </div>
        {/* < AddProblemStatement/>  // this page from admin dashboard*/}
    </Router>
  );
};

export default App;

