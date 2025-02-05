import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCoordinator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "Male",
    address: "",
    class_Div: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Coordinator:", formData);
    alert("Coordinator Added Successfully!");
    navigate("/coordinators");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-amber-700 mb-4">Add New Coordinator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["full_name", "email", "phone_number", "address", "class_Div", "department"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field.replace("_", " ")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-all">
            Add Coordinator
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoordinator;
