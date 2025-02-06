import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Compiler from "../Code_compiler/Compiler";

const Practice = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || user.role !== "Student") {
        toast.error("Please log in as a student to access this page.");
        sessionStorage.removeItem("user");
        navigate("/login");
      }
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem-stmt/`
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
  };

  const handleSolveClick = () => {
    if (selectedProblem) {
      navigate(`/solve-problem/${selectedProblem._id}`);
    }
  };

  return (
    <>
   
    <div className="flex p-6 bg-gray-100 min-h-screen pt-10">
      <div className="w-1/4 bg-gradient-to-b from-gray-200 to-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Problem Statements
        </h2>
        <ul className="space-y-4">
          {problems.map((problem, index) => (
            <li
              key={problem._id}
              onClick={() => handleProblemClick(problem)}
              className="text-black hover:bg-amber-500 hover:text-black cursor-pointer p-3 rounded-lg transition-all"
            >
              Problem {index + 1}: {problem.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 ml-6 bg-white p-6 rounded-lg shadow-lg">
        {selectedProblem ? (
          <div>
            <h3 className="text-2xl font-semibold text-amber-600 mb-4">
              {selectedProblem.title}
            </h3>
            <p className="text-gray-700 mb-6">{selectedProblem.description}</p>
            <button
              className="bg-gradient-to-b from-amber-500 to-orange-400 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full"
              onClick={handleSolveClick}
            >
              Solve
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <h3 className="text-xl font-semibold">
              Select a problem to start solving
            </h3>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>

  <Compiler/>
</>

  );
};

export default Practice;
