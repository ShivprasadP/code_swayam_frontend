import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventTable = () => {
  const [events, setEvents] = useState([]);
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
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events.");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateString).toLocaleDateString("en-GB", dateOptions);
    const time = new Date(dateString).toLocaleTimeString("en-US", timeOptions);
    return `${date} ${time}`;
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-black-700">
        Event Details
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-b from-amber-400 to-orange-400 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Date/ Time</th>
              <th className="p-3">Category</th>
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">{formatDate(event.date)}</td>
                  <td className="p-3 text-center font-semibold text-black-700">
                    {event.category}
                  </td>
                  <td className="p-3 text-center">{event.title}</td>
                  <td className="p-3 text-center">{event.contact}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/event/${event._id}`)}
                      className="bg-gradient-to-b from-amber-500 to-orange-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center">
                  No events available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
