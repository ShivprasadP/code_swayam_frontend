import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootcampManagement = () => {
  const navigate = useNavigate();
  const [bootcampData, setBootcampData] = useState([]);

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Bootcamp`
        );
        setBootcampData(response.data);
      } catch (error) {
        console.error("Error fetching bootcamps:", error);
      }
    };

    fetchBootcamps();
  }, []);

  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateString).toLocaleDateString("en-GB", dateOptions);
    const time = new Date(dateString).toLocaleTimeString("en-US", timeOptions);
    return { date, time };
  };

  const handleDelete = async (bootcampId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bootcamp?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/events/delete/${bootcampId}`
        );
        setBootcampData((prevData) =>
          prevData.filter((bootcamp) => bootcamp._id !== bootcampId)
        );
        toast.warning("Bootcamp deleted successfully!");
      } catch (error) {
        console.error("Error deleting bootcamp:", error);
        toast.error("Failed to delete bootcamp");
      }
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        <button
          onClick={() => navigate("/add_new_bootcamp")}
          className="absolute top-16 right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Bootcamp
        </button>

        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Bootcamp Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full mt-[40px] max-w-6xl border border-amber-300 shadow-md bg-white transition-transform transform ">
            <thead className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-center">
                  Bootcamp ID
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Title
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Instructor
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Duration (HR)
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Fee(RS)
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Date
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Time
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Venue
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Contact
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bootcampData.length > 0 ? (
                bootcampData.map((bootcamp, index) => {
                  const { date, time } = formatDate(bootcamp.date);
                  return (
                    <tr
                      key={index}
                      className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                    >
                      <td className="p-3 border border-orange-300 text-gray-800">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.title}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.instructor}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.duration}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.fee}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {date}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {time}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.venue}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700">
                        {bootcamp.contact}
                      </td>
                      <td className="p-3 border border-orange-300 text-gray-700 text-center">
                        <button
                          onClick={() => handleDelete(bootcamp._id)}
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
                  <td colSpan="10" className="p-4 text-center text-gray-500">
                    No Bootcamps Available!
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

export default BootcampManagement;
