import { useState } from "react";

function Card({ children, className }) {
  return <div className={`bg-orange-100 p-6 rounded-lg shadow-lg border-l-8 border-amber-500 transition-transform transform  ${className}`}>{children}</div>;
}

function Button({ children, onClick, className }) {
  return <button className={`bg-amber-500 text-white px-4 py-2 rounded shadow-md hover:bg-amber-600 transition-all ${className}`} onClick={onClick}>{children}</button>;
}

function Input({ placeholder, name, value, onChange }) {
  return <input className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder={placeholder} name={name} value={value} onChange={onChange} />;
}

function Table({ children }) {
  return <table className="w-full border-collapse border border-amber-300 shadow-md bg-orange-50">{children}</table>;
}

function TableHeader({ children }) {
  return <thead className="bg-amber-500 text-white">{children}</thead>;
}

function TableRow({ children }) {
  return <tr className="border-b hover:bg-orange-200 transition-all">{children}</tr>;
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

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const addProblem = () => {
    if (Object.values(problem).every(field => field)) {
      setProblems([...problems, problem]);
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
    }
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <Card className=" bg-white mb-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">Add Problem Statement</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Title" name="title" value={problem.title} onChange={handleChange} />
          <Input placeholder="Description" name="description" value={problem.description} onChange={handleChange} />
          <Input placeholder="Input" name="input" value={problem.input} onChange={handleChange} />
          <Input placeholder="Output" name="output" value={problem.output} onChange={handleChange} />
          <Input placeholder="Constraints" name="constraints" value={problem.constraints} onChange={handleChange} />
          <Input placeholder="Sample Input" name="sampleInput" value={problem.sampleInput} onChange={handleChange} />
          <Input placeholder="Sample Output" name="sampleOutput" value={problem.sampleOutput} onChange={handleChange} />
          <Input placeholder="Difficulty" name="difficulty" value={problem.difficulty} onChange={handleChange} />
          <Input placeholder="Languages" name="languages" value={problem.languages} onChange={handleChange} />
          <Input placeholder="Reward Points" name="rewardPoints" value={problem.rewardPoints} onChange={handleChange} />
        </div>
        <Button className="mt-4" onClick={addProblem}>Add Problem</Button>
      </Card>

      <Card  className="bg-white">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">Problem Statements</h2>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((p, index) => (
              <TableRow key={index}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.input}</TableCell>
                <TableCell>{p.output}</TableCell>
                <TableCell>{p.constraints}</TableCell>
                <TableCell>{p.sampleInput}</TableCell>
                <TableCell>{p.sampleOutput}</TableCell>
                <TableCell>{p.difficulty}</TableCell>
                <TableCell>{p.languages}</TableCell>
                <TableCell>{p.rewardPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
