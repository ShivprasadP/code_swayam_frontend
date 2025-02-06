import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const allCategories = [
  {
    title: "Student Event Registration Requests",
    description: "Create and Manage Coordinators",
    icon: "🧑‍🎓",
    color: "bg-violet-300",
    link: "/student-requests",
  },
  {
    title: "Event Management",
    description: "Manage Activities and Events",
    icon: "🎉",
    color: "bg-blue-300",
    link: "/event_management",
  },
  {
    title: "Bootcamp Management",
    description: "Manage Bootcamp Activities",
    icon: "📝",
    color: "bg-red-300",
    link: "/bootcamp-management",
  },
  {
    title: "Problem Statements",
    description: "Create and Manage Problem Statements",
    icon: "📊",
    color: "bg-gray-300",
    link: "/problem-statement-management",
  },
];

const FacultyFeatures = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.coordinator_role) {
      setCategories(allCategories);
    } else {
      setCategories(
        allCategories.filter(
          (category) => category.title === "Problem Statements"
        )
      );
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-0">
      {categories.map((item, index) => (
        <Link to={item.link} key={index}>
          <div
            className={`${item.color} p-6 h-40 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer transition-all`}
          >
            <div className="text-3xl text-gray-900">{item.icon}</div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FacultyFeatures;
