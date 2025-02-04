import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventTable from "./EventTable";
import EventDetails from "./EventDetails";
import events from "./events";  // Import events data


// This component need to  rendered on App.jsx 


function EventRouting() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventTable events={events} />} />
        <Route path="/event/:id" element={<EventDetails events={events} />} />
      </Routes>
    </Router>
  );
}

export default EventRouting;
