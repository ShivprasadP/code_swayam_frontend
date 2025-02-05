import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Contactus from "./component/contactus";
import Aboutus from "./component/aboutus";
import Home from "./component/home";
import Footer from "./component/footer";
import EventRouting from "./component/Events/EventRouting";
import Practice from "./component/Practice/Practice";
import Student_Request from "./component/Student_Request/Student_Request"
import Event_Management from "./component/Event_Management/Event_Management"
import Add_New_Events from "./component/Event_Management/Add_New_Events";
const App = () => {
  return (
    <Router>
      <div className="bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/events/category/:category" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          {/* <Route path="/Event_Management" element={<Event_Management />} />
          <Route path="/Add_New_Events" element={<Add_New_Events />} /> */}
        </Routes>
        <Student_Request />
        <Event_Management />
        <Add_New_Events />
        <Footer />
      </div>
    
    </Router>
  );
};

export default App;
