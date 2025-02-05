import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoordinatorTable from "./CoordinatorTable";

const CoordinatorList = () => {
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    setCoordinators(CoordinatorTable);
  }, []);

  const handleRemove = (id) => {
    const updatedCoordinators = coordinators.filter((coord) => coord.id !== id);
    setCoordinators(updatedCoordinators);
    alert("Coordinator Removed Successfully");
  };

  return (
    <div className="p-8 mt-[125px] bg-gray-100 min-h-screen flex flex-col items-center">
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
                <th className="p-3 border">Class-Div</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {CoordinatorTable.length > 0 ? (
                CoordinatorTable.map((CoordinatorTable) => (
                  <tr key={CoordinatorTable.id} className="border-b hover:bg-gray-100">
                    <td className="p-3 border text-center">{CoordinatorTable.id}</td>
                    <td className="p-3 border">{CoordinatorTable.full_name}</td>
                    <td className="p-3 border">{CoordinatorTable.email}</td>
                    <td className="p-3 border">{CoordinatorTable.phone_number}</td>
                    <td className="p-3 border">{CoordinatorTable.gender}</td>
                    <td className="p-3 border">{CoordinatorTable.address}</td>
                    <td className="p-3 border">{CoordinatorTable.class_Div || "—"}</td>
                    <td className="p-3 border">{CoordinatorTable.department || "—"}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleRemove(CoordinatorTable.id)}
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
    </div>
  );
};

export default CoordinatorList;
