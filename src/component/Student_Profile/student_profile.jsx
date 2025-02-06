import React, { useState } from "react";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send this data to a backend
    alert("Profile saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">Student Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={studentData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={studentData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={studentData.address}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-amber-500 to-orange-400 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
