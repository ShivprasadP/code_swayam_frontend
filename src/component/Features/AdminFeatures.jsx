import React from "react";

const categories = [
  {
    title: "Coordinator Management",
    description: "Create and Manage Coordinators",
    icon: "👨‍🏫",
    color: "bg-violet-300",
  },
  {
    title: "Actvity Management",
    description: "Manage Activities and Events",
    icon: "🎉",
    color: "bg-blue-300",
  },
];

const AdminFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-0">
      {categories.map((item, index) => (
        <div
          key={index}
          className={`${item.color} p-6 h-40 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer transition-all`}
        >
          <div className="text-3xl text-gray-900">{item.icon}</div>
          <div className="text-right">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminFeatures;
