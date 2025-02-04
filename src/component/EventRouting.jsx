// routing of different events 
// This page will include in StudentDashboard.jsx 


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventTable from "./EventTable";
import EventDetails from "./EventDetails"; // Add this for event details page
import events from "./events";

function EventRouting() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<EventTable events={events} />} />
      <Route path="/event/:id" element={<EventDetails/>} />
      </Routes>
    </Router>
  );
}

export default EventRouting;