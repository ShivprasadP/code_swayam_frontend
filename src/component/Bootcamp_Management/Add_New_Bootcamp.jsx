import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_New_Bootcamp = () => {
  const navigate = useNavigate();
  const [bootcampData, setBootcampData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    contact: "",
    instructor: "",
    duration: "",
    fee: "",
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
    setBootcampData({ ...bootcampData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      date,
      time,
      venue,
      contact,
      instructor,
      duration,
      fee,
    } = bootcampData;
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !venue ||
      !contact ||
      !instructor ||
      !duration ||
      !fee
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || !user.email) {
      toast.error("User session not found");
      return;
    }

    const bootcampDataWithOrganizer = {
      ...bootcampData,
      organizer: user.email,
      category: "Bootcamp",
      status: true,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events/add`,
        bootcampDataWithOrganizer
      );
      toast.success("Bootcamp added successfully!");
      navigate("/bootcamp-management");
    } catch (error) {
      console.error("Error adding bootcamp:", error);
      toast.error("Failed to add bootcamp");
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-l-8 border-amber-500">
        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Add New Bootcamp
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Bootcamp Title"
            value={bootcampData.title}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <textarea
            name="description"
            placeholder="Bootcamp Description"
            value={bootcampData.description}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="date"
            name="date"
            value={bootcampData.date}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="time"
            name="time"
            value={bootcampData.time}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="venue"
            placeholder="Bootcamp Venue"
            value={bootcampData.venue}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={bootcampData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="instructor"
            placeholder="Instructor"
            value={bootcampData.instructor}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (in hours)"
            value={bootcampData.duration}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee (in Rs)"
            value={bootcampData.fee}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
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

export default Add_New_Bootcamp;
