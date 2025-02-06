import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoordinatorList = () => {
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.coordinator_role) {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a admin to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/coordinators`
        );
        setCoordinators(response.data);
      } catch (error) {
        console.error("Error fetching coordinators:", error);
      }
    };

    fetchCoordinators();
  }, []);

  const handleRemove = async (email) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this coordinator?"
    );
    if (confirmRemove) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/coordinators/remove`, {
          email,
        });
        const updatedCoordinators = coordinators.filter(
          (coord) => coord.email !== email
        );
        setCoordinators(updatedCoordinators);
        toast.warning("Coordinator Removed Successfully");
      } catch (error) {
        console.error("Error removing coordinator:", error);
        toast.error("Failed to remove coordinator");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        {/* New Coordinator Button */}
        <button
          onClick={() => navigate("/add-coordinator")}
          className="absolute right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Coordinator
        </button>

        <div className="overflow-x-auto mt-[50px]">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Gender</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.length > 0 ? (
                coordinators.map((coordinator, index) => (
                  <tr
                    key={`${coordinator.email}-${index}`}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{coordinator.full_name}</td>
                    <td className="p-3 border">{coordinator.email}</td>
                    <td className="p-3 border">{coordinator.phone_number}</td>
                    <td className="p-3 border">{coordinator.gender}</td>
                    <td className="p-3 border">{coordinator.address}</td>
                    <td className="p-3 border">
                      {coordinator.department || "—"}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleRemove(coordinator.email)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-600">
                    No coordinators available.
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

export default CoordinatorList;
