import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventManagement = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Regular`
        );
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

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

  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateString).toLocaleDateString("en-GB", dateOptions);
    const time = new Date(dateString).toLocaleTimeString("en-US", timeOptions);
    return { date, time };
  };

  const handleStatusChange = async (event) => {
    try {
      const updatedEvent = { ...event, status: !event.status };
      await axios.put(
        `${import.meta.env.VITE_API_URL}/events/update/${event._id}`,
        updatedEvent
      );
      setEventData((prevData) =>
        prevData.map((e) =>
          e._id === event._id ? { ...e, status: !event.status } : e
        )
      );
      toast.success("Event status updated successfully!");
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/events/delete/${eventId}`
        );
        setEventData((prevData) =>
          prevData.filter((event) => event._id !== eventId)
        );
        toast.warning("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
      }
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        <button
          onClick={() => navigate("/add_new_events")}
          className="absolute top-16 right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Event
        </button>

        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Event Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full mt-[40px] max-w-6xl border border-amber-300 shadow-md bg-white transition-transform transform ">
            <thead className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-center">
                  Event ID
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Event Title
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Email
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Status
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Event Date
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Event Time
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {eventData.length > 0 ? (
                eventData.map((event, index) => {
                  const { date, time } = formatDate(event.created_at);
                  return (
                    <tr
                      key={index}
                      className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                    >
                      <td className="p-3 border border-orange-300 text-gray-800">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {event.title}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {event.organizer}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {event.status === true ? "Active" : "Inactive"}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {date}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {time}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700 text-center">
                        <button
                          onClick={() => handleStatusChange(event)}
                          className={`${
                            event.status === true
                              ? "bg-gradient-to-b from-amber-500 to-orange-400 hover:bg-gradient-to-b from-amber-500 to-orange-400"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white px-4 py-2 rounded-lg transition-all`}
                        >
                          {event.status === true ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No Events Available!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EventManagement;
