import "react";
import { useNavigate } from "react-router-dom";

const eventData = []; // Replace with actual event data

const EventManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 relative">
        <button
          onClick={() => navigate("/add-event")}
          className="absolute top-6 right-6 from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          New Event
        </button>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Event Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="text-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {eventData.length > 0 ? (
                eventData.map((event, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="p-4 text-gray-800">{event.id}</td>
                    <td className="p-4 text-gray-700">{event.date}</td>
                    <td className="p-4 text-gray-700">{event.category}</td>
                    <td className="p-4 text-gray-700">{event.name}</td>
                    <td className="p-4 text-gray-700">{event.description}</td>
                    <td className="p-4 text-gray-700">{event.contact}</td>
                    <td className="p-4 text-gray-700">{event.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No Events Available!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
