import { useState } from "react";

function Card({ children, className }) {
  return <div className={`bg-white-100 p-6 rounded-lg shadow-lg border-l-8 border-amber-500 transition-transform transform hover:scale-105 ${className}`}>{children}</div>;
}

function Button({ children, onClick, className }) {
  return <button className={`bg-amber-500 text-white px-4 py-2 rounded shadow-md hover:bg-amber-600 transition-all ${className}`} onClick={onClick}>{children}</button>;
}

function Input({ placeholder, name, value, onChange }) {
  return <input className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder={placeholder} name={name} value={value} onChange={onChange} />;
}

function Table({ children }) {
  return <table className="w-full border-collapse border border-amber-300 shadow-md bg-white-50">{children}</table>;
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

export default function BootcampPage() {
  const [bootcamps, setBootcamps] = useState([
    { title: "React Mastery", instructor: "John Doe", duration: "6 Weeks", fee: "$500", date: "2024-02-10", time: "10:00 AM", venue: "Test College", contact: "1234567890" },
    { title: "Full Stack Development", instructor: "Jane Smith", duration: "8 Weeks", fee: "$700", date: "2024-03-15", time: "11:00 AM", venue: "Tech Hub", contact: "9876543210" },
  ]);

  const [newBootcamp, setNewBootcamp] = useState({ title: "", instructor: "", duration: "", fee: "", date: "", time: "", venue: "", contact: "" });

  const handleChange = (e) => {
    setNewBootcamp({ ...newBootcamp, [e.target.name]: e.target.value });
  };

  const addBootcamp = () => {
    if (Object.values(newBootcamp).every(field => field)) {
      setBootcamps([...bootcamps, newBootcamp]);
      setNewBootcamp({ title: "", instructor: "", duration: "", fee: "", date: "", time: "", venue: "", contact: "" });
    }
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <Card className="mb-6 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">Add Bootcamp</h2>
        <div className="grid grid-cols-4 gap-4">
          <Input placeholder="Bootcamp Title" name="title" value={newBootcamp.title} onChange={handleChange} />
          <Input placeholder="Instructor" name="instructor" value={newBootcamp.instructor} onChange={handleChange} />
          <Input placeholder="Duration" name="duration" value={newBootcamp.duration} onChange={handleChange} />
          <Input placeholder="Fee" name="fee" value={newBootcamp.fee} onChange={handleChange} />
          <Input placeholder="Date" name="date" value={newBootcamp.date} onChange={handleChange} type="date" />
          <Input placeholder="Time" name="time" value={newBootcamp.time} onChange={handleChange} type="time" />
          <Input placeholder="Venue" name="venue" value={newBootcamp.venue} onChange={handleChange} />
          <Input placeholder="Contact" name="contact" value={newBootcamp.contact} onChange={handleChange} />
        </div>
        <Button className="mt-4" onClick={addBootcamp}>Add Bootcamp</Button>
      </Card>

      <Card className="mb-6 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">Bootcamp List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bootcamps.map((bootcamp, index) => (
              <TableRow key={index}>
                <TableCell>{bootcamp.title}</TableCell>
                <TableCell>{bootcamp.instructor}</TableCell>
                <TableCell>{bootcamp.duration}</TableCell>
                <TableCell>{bootcamp.fee}</TableCell>
                <TableCell>{bootcamp.date}</TableCell>
                <TableCell>{bootcamp.time}</TableCell>
                <TableCell>{bootcamp.venue}</TableCell>
                <TableCell>{bootcamp.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
