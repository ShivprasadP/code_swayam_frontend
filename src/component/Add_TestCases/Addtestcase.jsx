import React, { useState } from "react";

const AddTestCases = () => {
  // Mock problem statements (Replace with actual problem list from API)
  const problemStatements = [
    { id: 1, name: "Reverse a String" },
    { id: 2, name: "Find Factorial" },
    { id: 3, name: "Check Prime Number" },
  ];

  // State for test case details
  const [testName, setTestName] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");

  // State to store added test cases
  const [testCases, setTestCases] = useState([]);

  // Function to add test case
  const handleAddTestCase = () => {
    if (!testName || !input || !output || !selectedProblem) {
      alert("Please fill all fields before adding.");
      return;
    }

    const newTestCase = {
      id: testCases.length + 1,
      testName,
      input,
      output,
      problemName: problemStatements.find((p) => p.id === parseInt(selectedProblem)).name,
    };

    setTestCases([...testCases, newTestCase]);
    setTestName("");
    setInput("");
    setOutput("");
    setSelectedProblem("");
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border-l-8 border-amber-500">
        <h2 className="text-2xl font-bold text-orange-700 mb-6">Add Test Cases</h2>

        {/* Test Case Form */}
        <div className="space-y-4">
          <div>
            <label className="text-lg font-semibold text-gray-700">Test Case Name:</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="Enter test case name"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">Input (comma separated):</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="e.g. 5, 10, 15"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">Expected Output:</label>
            <input
              type="text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="e.g. 25"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">Problem Statement:</label>
            <select
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select a problem</option>
              {problemStatements.map((problem) => (
                <option key={problem.id} value={problem.id}>
                  {problem.name}
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
            <h3 className="text-xl font-semibold text-orange-700 mb-4">Added Test Cases</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-amber-500 shadow-md bg-white">
                <thead className="bg-amber-500 text-white">
                  <tr>
                    <th className="p-3 border border-orange-300">Test Case</th>
                    <th className="p-3 border border-orange-300">Input</th>
                    <th className="p-3 border border-orange-300">Output</th>
                    <th className="p-3 border border-orange-300">Problem</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((test, index) => (
                    <tr key={index} className="border-b border-orange-300 hover:bg-orange-200 transition-all">
                      <td className="p-3 border border-orange-300">{test.testName}</td>
                      <td className="p-3 border border-orange-300">{test.input}</td>
                      <td className="p-3 border border-orange-300">{test.output}</td>
                      <td className="p-3 border border-orange-300">{test.problemName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTestCases;
