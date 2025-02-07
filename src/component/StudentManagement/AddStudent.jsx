import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddStudent = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    password: "",
    role: "Student",
    class: "",
    div: "",
    department: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register/student`,
        studentData
      );
      console.log("Student Added:", response.data);
      toast.success("Student added successfully!");
      navigate("/student-management");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-l-8 border-amber-500">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">
          Add New Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={studentData.full_name}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="abc123@gmail.com"
            value={studentData.email}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={studentData.phone_number}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <select
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="address"
            placeholder="Address"
            value={studentData.address}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={studentData.password}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={studentData.class}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="div"
            placeholder="Division"
            value={studentData.div}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={studentData.department}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-orange-500 transition-all"
          >
            Submit
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddStudent;
