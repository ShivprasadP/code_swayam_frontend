import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// THis page need to render on student dashboard 


const Practice = () => {
  // Sample problems data
  const problems = [
    {
      id: 1,
      title: "Problem 1: Reverse a String",
      description: "Write a function to reverse a string without using built-in reverse methods.",
    },
    {
      id: 2,
      title: "Problem 2: Fibonacci Sequence",
      description: "Write a function to generate the Fibonacci sequence up to the nth number.",
    },
    {
      id: 3,
      title: "Problem 3: Palindrome Check",
      description: "Write a function to check if a given string is a palindrome.",
    },
    {
      id: 4,
      title: "Problem 4: Find the Largest Number",
      description: "Write a function that finds the largest number in a given array of numbers.",
    },
    {
      id: 5,
      title: "Problem 5: Sum of Digits",
      description: "Write a function to find the sum of digits of a given number.",
    },
  ];

  // State to store the currently selected problem
  const [selectedProblem, setSelectedProblem] = useState(null);

  // Handle problem click
  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      {/* Left Section - Problem List */}
      <div className="w-1/4 bg-gradient-to-b from-gray-200 to-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Problem Statements</h2>
        <ul className="space-y-4">
          {problems.map((problem) => (
            <li
              key={problem.id}
              onClick={() => handleProblemClick(problem)}
              className="text-black hover:bg-amber-500 hover:text-black cursor-pointer p-3 rounded-lg transition-all"
            >
              {problem.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Problem Details */}
      <div className="w-3/4 ml-6 bg-white p-6 rounded-lg shadow-lg">
        {selectedProblem ? (
          <div>
            <h3 className="text-2xl font-semibold text-amber-600 mb-4">{selectedProblem.title}</h3>
            <p className="text-gray-700 mb-6">{selectedProblem.description}</p>
            <button className="bg-gradient-to-b from-amber-500 to-orange-400 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full">
              Solve
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <h3 className="text-xl font-semibold">Select a problem to start solving</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
