import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddTestCases = () => {
  // State for problem statements
  const [problemStatements, setProblemStatements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.coordinator_role) {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a coordinator to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  // State for test case details
  const [testName, setTestName] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");

  // State to store added test cases
  const [testCases, setTestCases] = useState([]);

  // Fetch problem statements from backend
  useEffect(() => {
    const fetchProblemStatements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem-stmt`
        );
        setProblemStatements(response.data);
      } catch (error) {
        console.error("Error fetching problem statements:", error);
        toast.error("Failed to fetch problem statements.");
      }
    };

    fetchProblemStatements();
  }, []);

  // Fetch test cases from backend
  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/test-cases`
        );
        setTestCases(response.data);
      } catch (error) {
        console.error("Error fetching test cases:", error);
        toast.error("Failed to fetch test cases.");
      }
    };

    fetchTestCases();
  }, []);

  // Function to add test case
  const handleAddTestCase = async () => {
    if (!testName || !input || !output || !selectedProblem) {
      toast.error("Please fill all fields before adding.");
      return;
    }

    const newTestCase = {
      title: testName,
      input,
      expected_output: output,
      problemStatementId: selectedProblem,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/test-cases/add`,
        newTestCase
      );
      setTestCases([...testCases, response.data]);
      setTestName("");
      setInput("");
      setOutput("");
      setSelectedProblem("");
      toast.success("Test case added successfully!");
    } catch (error) {
      console.error("Error adding test case:", error);
      toast.error("Failed to add test case.");
    }
  };

  // Function to delete test case
  const handleDeleteTestCase = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test case?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/test-cases/delete/${id}`
        );
        setTestCases(testCases.filter((test) => test._id !== id));
        toast.warning("Test case deleted successfully!");
      } catch (error) {
        console.error("Error deleting test case:", error);
        toast.error("Failed to delete test case.");
      }
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border-l-8 border-amber-500">
        <h2 className="text-2xl font-bold text-orange-700 mb-6">
          Add Test Cases
        </h2>

        {/* Test Case Form */}
        <div className="space-y-4">
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Test Case Name:
            </label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="Enter test case name"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">
              Input (comma separated):
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="e.g. 5, 10, 15"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">
              Expected Output:
            </label>
            <input
              type="text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="e.g. 25"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">
              Problem Statement:
            </label>
            <select
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select a problem</option>
              {problemStatements.map((problem) => (
                <option key={problem._id} value={problem._id}>
                  {problem.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddTestCase}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-all shadow-md"
          >
            Add Test Case ➕
          </button>
        </div>

        {/* Test Cases Table */}
        {testCases.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">
              Added Test Cases
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-amber-500 shadow-md bg-white">
                <thead className="bg-amber-500 text-white">
                  <tr>
                    <th className="p-3 border border-orange-300">Test Case</th>
                    <th className="p-3 border border-orange-300">Input</th>
                    <th className="p-3 border border-orange-300">Output</th>
                    <th className="p-3 border border-orange-300">Problem</th>
                    <th className="p-3 border border-orange-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((test, index) => (
                    <tr
                      key={index}
                      className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                    >
                      <td className="p-3 border border-orange-300">
                        {test.title}
                      </td>
                      <td className="p-3 border border-orange-300">
                        {test.input}
                      </td>
                      <td className="p-3 border border-orange-300">
                        {test.expected_output}
                      </td>
                      <td className="p-3 border border-orange-300">
                        {
                          problemStatements.find(
                            (p) => p._id === test.problemStatementId
                          )?.title
                        }
                      </td>
                      <td className="p-3 border border-orange-300 text-center">
                        <button
                          onClick={() => handleDeleteTestCase(test._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTestCases;
