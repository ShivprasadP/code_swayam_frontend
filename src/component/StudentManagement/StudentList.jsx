import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || user.role !== "Faculty") {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as an faculty to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/role/Student`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this student?"
    );
    if (confirmRemove) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
        const updatedStudents = students.filter(
          (student) => student._id !== id
        );
        setStudents(updatedStudents);
        toast.warning("Student Removed Successfully");
      } catch (error) {
        console.error("Error removing student:", error);
        toast.error("Failed to remove student");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 transition-transform transform relative">
        {/* New Student Button */}
        <button
          onClick={() => navigate("/add-student")}
          className="absolute right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-amber-500 hover:to-amber-700 transition-all"
        >
          New Student
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
                <th className="p-3 border">Class</th>
                <th className="p-3 border">Division</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={`${student._id}-${index}`}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{student.full_name}</td>
                    <td className="p-3 border">{student.email}</td>
                    <td className="p-3 border">{student.phone_number}</td>
                    <td className="p-3 border">{student.gender}</td>
                    <td className="p-3 border">{student.address}</td>
                    <td className="p-3 border">{student.class || "—"}</td>
                    <td className="p-3 border">{student.div || "—"}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleRemove(student._id)}
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
                    No students available.
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

export default StudentList;
