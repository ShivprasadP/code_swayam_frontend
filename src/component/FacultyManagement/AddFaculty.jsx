import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [facultyData, setfacultyData] = useState({
    name: "",
    date: "",
    category: "",
    description: "",
    contact: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.role === "Admin") {
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

  const handleChange = (e) => {
    setfacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Faculty Added:", facultyData);
    navigate("/"); // Navigate back to event list after submission
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-l-8 border-amber-500">
        <h2 className="text-xl font-semibold mb-4 text-amber-700 ">
          Add New Faculty
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="FirstName MiddleName LastName"
            value={facultyData.name}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="email"
            placeholder="abc123@gmail.com"
            name="email"
            value={facultyData.email}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Mobile Number"
            value={facultyData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            name="gender"
            value={facultyData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            value={facultyData.address}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={facultyData.department}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={facultyData.designation}
            onChange={handleChange}
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-orange-500 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
