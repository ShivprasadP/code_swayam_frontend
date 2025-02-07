import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    password: "",
    role: "",
    class: "",
    div: "",
    department: "",
    designation: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in to access this page.",
          },
        });
      } else {
        setUserData(user);
        setOriginalData(user);
      }
    };

    checkUserSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userData._id}`,
        userData
      );
      alert("Profile saved successfully!");
      setOriginalData(userData);
      setIsChanged(false);
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">
          Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={userData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {userData.role === "User" && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={userData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Division
                </label>
                <input
                  type="text"
                  name="div"
                  value={userData.div}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </>
          )}

          {userData.role === "Faculty" && (
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={userData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {userData.role === "Faculty" && (
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={userData.designation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-gradient-to-b from-amber-500 to-orange-400 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all ${
              isChanged ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isChanged}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
