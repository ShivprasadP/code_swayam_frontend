import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add_New_Events = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    category: "",
    description: "",
    contact: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Added:", eventData);
    navigate("/"); // Navigate back to event list after submission
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={eventData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={eventData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_New_Events;
