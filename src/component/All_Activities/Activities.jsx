import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        const filteredActivities = response.data.filter(
          (activity) =>
            activity.category === "Regular" || activity.category === "Bootcamp"
        );
        setActivities(filteredActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const removeActivity = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/events/delete/${id}`);
      setActivities(activities.filter((activity) => activity._id !== id));
      toast.warning("Activity removed successfully!");
    } catch (error) {
      console.error("Error removing activity:", error);
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto border-l-8 border-amber-500 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-orange-700 mb-6">
          Bootcamps & Events
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-amber-500 shadow-md bg-white">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-3 border border-orange-300">Title</th>
                <th className="p-3 border border-orange-300">Date</th>
                <th className="p-3 border border-orange-300">Time</th>
                <th className="p-3 border border-orange-300">Organizer</th>
                <th className="p-3 border border-orange-300">Category</th>
                <th className="p-3 border border-orange-300">Action</th>
              </tr>
            </thead>

            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr
                    key={activity._id}
                    className="border-b border-orange-300 transition-all"
                  >
                    <td className="p-3 border border-orange-300">
                      {activity.title}
                    </td>
                    <td className="p-3 border border-orange-300">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-orange-300">
                      {activity.time}
                    </td>
                    <td className="p-3 border border-orange-300">
                      {activity.organizer}
                    </td>
                    <td className="p-3 border border-orange-300">
                      {activity.category}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      <button
                        onClick={() => removeActivity(activity._id)}
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

      <ToastContainer />
    </div>
  );
};

export default Activities;
