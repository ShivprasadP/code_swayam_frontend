import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.role === "Student") {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a student to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        setError("Error fetching event details.");
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please log in to register for the event.");
      return;
    }

    const requestData = {
      studentId: user._id,
      eventId: id,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/student-requests`,
        requestData
      );
      toast.success("Successfully registered for the event!");
    } catch (error) {
      toast.error("Failed to register for the event.");
      console.error("Error registering for the event:", error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!event) {
    return <h1>Event not found!</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-black-700">
        {event.title}
      </h2>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-2xl font-semibold text-black-600">
            Event Details
          </h3>
          <p className="text-gray-700 mt-2">{event.description}</p>
        </div>
        <div className="mb-4">
          <strong>Date:</strong>{" "}
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="mb-4">
          <strong>Time:</strong> <span>{event.time}</span>
        </div>
        <div className="mb-4">
          <strong>Venue:</strong> <span>{event.venue}</span>
        </div>
        <div className="mb-4">
          <strong>Organizer:</strong> <span>{event.organizer}</span>
        </div>
        <div className="mb-4">
          <strong>Contact:</strong> <span>{event.contact}</span>
        </div>
        <div className="mb-4">
          <strong>Category:</strong> <span>{event.category}</span>
        </div>
        <div className="mb-4">
          <strong>Status:</strong>{" "}
          <span>{event.status ? "Active" : "Inactive"}</span>
        </div>
        {event.category !== "Regular" && (
          <>
            <div className="mb-4">
              <strong>Instructor:</strong> <span>{event.instructor}</span>
            </div>
            <div className="mb-4">
              <strong>Duration:</strong> <span>{event.duration} hours</span>
            </div>
            <div className="mb-4">
              <strong>Fee:</strong> <span>₹{event.fee}</span>
            </div>
          </>
        )}
        <div className="mb-4">
          <button
            onClick={handleRegister}
            className={`bg-gradient-to-b from-amber-500 to-orange-400 text-white px-6 py-3 rounded-lg transition-all w-full ${
              !event.status
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gradient-to-b from-amber-500 to-orange-400 text-white"
            }`}
            disabled={!event.status}
          >
            Register Now
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EventDetails;
