import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoordinator = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userEmail = e.target.value;
    const user = users.find((user) => user.email === userEmail);
    setSelectedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/coordinators/assign`, {
          email: selectedUser.email,
          coordinator_role: true,
        });
        toast.success("Coordinator Role Assigned Successfully!");
        navigate("/coordinator-management");
      } catch (error) {
        console.error("Error assigning coordinator role:", error);
        toast.error("Failed to assign coordinator role");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-amber-700 mb-4">
          Add New Coordinator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Select User Email</label>
            <select
              name="userEmail"
              onChange={handleUserChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select an email</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          {selectedUser && (
            <table className="w-full border border-gray-300 shadow-md rounded-lg mt-4">
              <thead className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
                <tr>
                  <th className="p-3 border">Full Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{selectedUser.full_name}</td>
                  <td className="p-3 border">{selectedUser.email}</td>
                  <td className="p-3 border">{selectedUser.phone_number}</td>
                  <td className="p-3 border">{selectedUser.gender}</td>
                </tr>
              </tbody>
            </table>
          )}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-all"
          >
            Assign Coordinator Role
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCoordinator;
