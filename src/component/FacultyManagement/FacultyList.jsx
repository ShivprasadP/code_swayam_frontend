import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacultyList = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || user.role !== "Admin") {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as an admin to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/role/Faculty`
        );
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this faculty?"
    );
    if (confirmRemove) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
        const updatedFaculties = faculties.filter(
          (faculty) => faculty._id !== id
        );
        setFaculties(updatedFaculties);
        toast.warning("Faculty Removed Successfully");
      } catch (error) {
        console.error("Error removing faculty:", error);
        toast.error("Failed to remove faculty");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        {/* New Faculty Button */}
        <button
          onClick={() => navigate("/add-faculty")}
          className="absolute right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Faculty
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
              {faculties.length > 0 ? (
                faculties.map((faculty, index) => (
                  <tr
                    key={`${faculty._id}-${index}`}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{faculty.full_name}</td>
                    <td className="p-3 border">{faculty.email}</td>
                    <td className="p-3 border">{faculty.phone_number}</td>
                    <td className="p-3 border">{faculty.gender}</td>
                    <td className="p-3 border">{faculty.address}</td>
                    <td className="p-3 border">{faculty.department || "—"}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleRemove(faculty._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-600">
                    No faculties available.
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

export default FacultyList;
