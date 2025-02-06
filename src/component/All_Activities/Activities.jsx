import React, { useState } from "react";

const Activities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "AI Bootcamp",
      description: "Learn Artificial Intelligence from industry experts.",
      date: "2025-03-10",
      time: "10:00 AM",
      venue: "Tech Auditorium",
      organizer: "AI Community",
      contact: "ai.bootcamp@example.com",
      category: "Bootcamp",
      status: "Upcoming",
      instructor: "Dr. John Doe",
      duration: "5 Days",
      fee: "$50",
    },
    {
      id: 2,
      title: "Cybersecurity Workshop",
      description: "A hands-on session on ethical hacking and security.",
      date: "2025-04-05",
      time: "2:00 PM",
      venue: "Online Webinar",
      organizer: "CyberSec Hub",
      contact: "cybersec@example.com",
      category: "Workshop",
      status: "Open for Registration",
      instructor: "Jane Smith",
      duration: "3 Hours",
      fee: "Free",
    },
  ]);

  // Function to remove an activity
  const removeActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto border-l-8 border-amber-500 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-orange-700 mb-6">Bootcamps & Events</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-amber-500 shadow-md bg-white">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-3 border border-orange-300">Title</th>
                <th className="p-3 border border-orange-300">Description</th>
                <th className="p-3 border border-orange-300">Date</th>
                <th className="p-3 border border-orange-300">Time</th>
                <th className="p-3 border border-orange-300">Venue</th>
                <th className="p-3 border border-orange-300">Organizer</th>
                <th className="p-3 border border-orange-300">Contact</th>
                <th className="p-3 border border-orange-300">Category</th>
                <th className="p-3 border border-orange-300">Status</th>
                <th className="p-3 border border-orange-300">Instructor</th>
                <th className="p-3 border border-orange-300">Duration</th>
                <th className="p-3 border border-orange-300">Fee</th>
                <th className="p-3 border border-orange-300">Action</th>
              </tr>
            </thead>

            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b border-orange-300 transition-all"
                  >
                    <td className="p-3 border border-orange-300">{activity.title}</td>
                    <td className="p-3 border border-orange-300">{activity.description}</td>
                    <td className="p-3 border border-orange-300">{activity.date}</td>
                    <td className="p-3 border border-orange-300">{activity.time}</td>
                    <td className="p-3 border border-orange-300">{activity.venue}</td>
                    <td className="p-3 border border-orange-300">{activity.organizer}</td>
                    <td className="p-3 border border-orange-300">{activity.contact}</td>
                    <td className="p-3 border border-orange-300">{activity.category}</td>
                    <td className="p-3 border border-orange-300">{activity.status}</td>
                    <td className="p-3 border border-orange-300">{activity.instructor}</td>
                    <td className="p-3 border border-orange-300">{activity.duration}</td>
                    <td className="p-3 border border-orange-300">{activity.fee}</td>
                    <td className="p-3 border border-orange-300 text-center">
                      <button
                        onClick={() => removeActivity(activity.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="p-4 text-center text-gray-500">
                    No Bootcamps or Events Available!
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

export default Activities;
