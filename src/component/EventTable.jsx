import React from "react";


import { useNavigate } from "react-router-dom";

const EventTable = ({ events }) => {
  const navigate = useNavigate();
  console.log(events); // Add this to see the events data

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-black-700">Event Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-b from-amber-500 to-orange-400 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-center">{event.id}</td>
                  <td className="p-3 text-center">{event.date}</td>
                  <td className="p-3 text-center font-semibold text-black-700">{event.category}</td>
                  <td className="p-3 text-center">{event.name}</td>
                  <td className="p-3 text-center truncate max-w-xs">{event.description}</td>
                  <td className="p-3 text-center">{event.contact}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="bg-gradient-to-b from-amber-500 to-orange-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center">No events available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;

