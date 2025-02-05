import "react";
import { useNavigate } from "react-router-dom";

const eventData = []; // Replace with actual event data

const EventManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 mt-[145px] bg-orange-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        {/* New Event Button */}
        <button
          onClick={() => navigate("/add-event")}
          className="absolute top-16 right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Event
        </button>

        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Event Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full mt-[40px] max-w-6xl border border-amber-300 shadow-md bg-white transition-transform transform ">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-left">Event ID</th>
                <th className="p-3 border border-orange-300 text-left">Email</th>
                <th className="p-3 border border-orange-300 text-left">Status</th>
                <th className="p-3 border border-orange-300 text-left">Created At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {eventData.length > 0 ? (
                eventData.map((event, index) => (
                  <tr key={index} className="border-b border-orange-300 hover:bg-orange-200 transition-all">
                    <td className="p-3 border border-orange-300 text-gray-800">{event.eventId}</td>
                    <td className="p-3 border border-orange-300 text-gray-700">{event.email}</td>
                    <td className="p-3 border border-orange-300 text-gray-700">{event.status}</td>
                    <td className="p-3 border border-orange-300 text-gray-700">{new Date(event.created_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
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
