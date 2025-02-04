import React from "react";
import { useParams } from "react-router-dom";

function EventDetails({ events }) {
  // Getting the event id from the URL
  const { id } = useParams();
  
  // Ensure that events is available and not undefined
  if (!events) {
    return <h1>Events data is not available.</h1>;
  }

  // Finding the event details based on the id
  const event = events.find((event) => event.id === parseInt(id));

  // Check if the event was not found
  if (!event) {
    return <h1>Event not found!</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-black-700">{event.name}</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-2xl font-semibold text-black-600">Event Details</h3>
          <p className="text-gray-700 mt-2">{event.description}</p>
        </div>
        <div className="mb-4">
          <strong>Date:</strong> <span>{event.date}</span>
        </div>
        <div className="mb-4">
          <strong>Category:</strong> <span>{event.category}</span>
        </div>
        <div className="mb-4">
          <strong>Contact:</strong> <span>{event.contact}</span>
        </div>
        <div className="mb-4">
          <button
            onClick={() => alert("Successfully Registered for the event!")}
            className="bg-gradient-to-b from-amber-500 to-orange-400 text-white text-white px-6 py-3 rounded-lg hover:bg-gradient-to-b from-amber-500 to-orange-400 text-white transition-all w-full"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
