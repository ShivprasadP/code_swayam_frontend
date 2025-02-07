import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventTable from "./EventTable";
import EventDetails from "./EventDetails";

// This component needs to be rendered in App.jsx

function EventRouting() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventTable />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default EventRouting;
