import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_New_Events = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    contact: "",
    category: "",
  });

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.coordinator_role) {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a coordinator to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const { title, description, date, time, venue, contact, category } =
      eventData;
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !venue ||
      !contact ||
      !category
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Get organizer email from user session
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || !user.email) {
      toast.error("User session not found");
      return;
    }

    const eventDataWithOrganizer = {
      ...eventData,
      organizer: user.email,
      status: true,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events/add`,
        eventDataWithOrganizer
      );
      toast.success("Event added successfully!");
      navigate("/event_management");
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-l-8 border-amber-500">
        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={eventData.venue}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={eventData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select Category</option>
            <option value="Regular">Regular</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-orange-500 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Add_New_Events;
