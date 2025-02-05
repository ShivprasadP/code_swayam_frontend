import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  {
    title: "Events",
    description: "Gain Practical Experience ",
    icon: "💻",
    color: "bg-green-300",
  },
  {
    title: "Practice",
    description: "Refine Skills Daily",
    icon: "⌨️",
    color: "bg-purple-300",
  },
  {
    title: "Bootcamps",
    description: "Battle For Excellence",
    icon: "🏆",
    color: "bg-yellow-300",
  },
  {
    title: "More",
    description: "Explore More Opportunities",
    icon: "🚀",
    color: "bg-pink-300",
  },
];

export default function UnlockCareer() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const session = checkSession();
    if (session) {
      toast.success("Profile completion is available.");
    } else {
      toast.error("Please log in first.");
      navigate("/login");
    }
  };

  const checkSession = () => {
    // Replace this with your actual session check logic
    return sessionStorage.getItem("user") !== null;
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-left">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Code with<span className="text-amber-600"> Swayam !</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Explore opportunities to grow, showcase skills, gain points & get
          hired by your dream company.
        </p>

        <div className="p-4 ">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold">
              Get the best recommendations!
            </h2>
            <p className="text-gray-600">
              Share your background and career goals for personalized
              recommendations.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleButtonClick}
            >
              Complete my profile
            </button>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-0">
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
      <ToastContainer />
    </div>
  );
}
