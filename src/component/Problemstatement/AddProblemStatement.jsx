import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card({ children, className }) {
  return (
    <div
      className={`bg-orange-100 p-6 rounded-lg shadow-lg border-l-8 border-amber-500 transition-transform transform  ${className}`}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, className }) {
  return (
    <button
      className={`bg-amber-500 text-white px-4 py-2 rounded shadow-md hover:bg-amber-600 transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Input({ placeholder, name, value, onChange }) {
  return (
    <input
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

function Textarea({ placeholder, name, value, onChange }) {
  return (
    <textarea
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
    />
  );
}

function Table({ children }) {
  return (
    <table className="w-full border-collapse border border-amber-300 shadow-md bg-orange-50">
      {children}
    </table>
  );
}

function TableHeader({ children }) {
  return <thead className="bg-amber-500 text-white">{children}</thead>;
}

function TableRow({ children }) {
  return (
    <tr className="border-b hover:bg-orange-200 transition-all">{children}</tr>
  );
}

function TableHead({ children }) {
  return <th className="p-3 border border-amber-300">{children}</th>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableCell({ children }) {
  return <td className="p-3 border border-amber-300">{children}</td>;
}

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default function AddProblemStatement() {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    difficulty: "",
    languages: "",
    rewardPoints: "",
  });
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

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem-stmt`
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problem statements:", error);
        toast.error("Failed to fetch problem statements");
      }
    };

    fetchProblems();
  }, []);

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const addProblem = async () => {
    if (Object.values(problem).every((field) => field)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/problem-stmt/add`,
          {
            ...problem,
            languages: problem.languages.split(",").map((lang) => lang.trim()),
          }
        );
        setProblems([...problems, response.data]);
        setProblem({
          title: "",
          description: "",
          input: "",
          output: "",
          constraints: "",
          sampleInput: "",
          sampleOutput: "",
          difficulty: "",
          languages: "",
          rewardPoints: "",
        });
        toast.success("Problem statement added successfully!");
      } catch (error) {
        console.error("Error adding problem statement:", error);
        toast.error("Failed to add problem statement");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  const deleteProblem = async (problemStatementId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this problem statement?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/problem-stmt/${problemStatementId}`
        );
        setProblems(
          problems.filter((problem) => problem._id !== problemStatementId)
        );
        toast.warning("Problem statement deleted successfully!");
      } catch (error) {
        console.error("Error deleting problem statement:", error);
        toast.error("Failed to delete problem statement");
      }
    }
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <Card className=" bg-white mb-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">
          Add Problem Statement
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Title"
            name="title"
            value={problem.title}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Description"
            name="description"
            value={problem.description}
            onChange={handleChange}
          />
          <Input
            placeholder="Input"
            name="input"
            value={problem.input}
            onChange={handleChange}
          />
          <Input
            placeholder="Output"
            name="output"
            value={problem.output}
            onChange={handleChange}
          />
          <Input
            placeholder="Constraints"
            name="constraints"
            value={problem.constraints}
            onChange={handleChange}
          />
          <Input
            placeholder="Sample Input"
            name="sampleInput"
            value={problem.sampleInput}
            onChange={handleChange}
          />
          <Input
            placeholder="Sample Output"
            name="sampleOutput"
            value={problem.sampleOutput}
            onChange={handleChange}
          />
          <Input
            placeholder="Difficulty"
            name="difficulty"
            value={problem.difficulty}
            onChange={handleChange}
          />
          <Input
            placeholder="Languages (comma separated)"
            name="languages"
            value={problem.languages}
            onChange={handleChange}
          />
          <Input
            placeholder="Reward Points"
            name="rewardPoints"
            value={problem.rewardPoints}
            onChange={handleChange}
          />
        </div>
        <Button className="mt-4" onClick={addProblem}>
          Add Problem
        </Button>
      </Card>

      <Card className="bg-white">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">
          Problem Statements
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Input</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Constraints</TableHead>
              <TableHead>Sample Input</TableHead>
              <TableHead>Sample Output</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Reward Points</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((p, index) => (
              <TableRow key={index}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{truncateText(p.description, 100)}</TableCell>
                <TableCell>{p.input}</TableCell>
                <TableCell>{p.output}</TableCell>
                <TableCell>{p.constraints}</TableCell>
                <TableCell>{p.sampleInput}</TableCell>
                <TableCell>{p.sampleOutput}</TableCell>
                <TableCell>{p.difficulty}</TableCell>
                <TableCell>{p.languages.join(", ")}</TableCell>
                <TableCell>{p.rewardPoints}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => deleteProblem(p._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ToastContainer />
    </div>
  );
}
