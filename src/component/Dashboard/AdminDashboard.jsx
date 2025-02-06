import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Slideshow from "../Slideshow";
import AdminFeatures from "../Features/AdminFeatures";

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response1 = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Regular`
        );
        const response2 = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Bootcamp`
        );
        setCards([...response1.data, ...response2.data]);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const location = useLocation();

  useEffect(() => {
    const showToast = location.state?.showToast;

    if (showToast) {
      toast.success("Login successful!");
    }
  }, [location.state]);

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-18">
        Welcome <span className="text-amber-600"> Admin !</span>
      </h1>
      <AdminFeatures />

      <div className="container mx-auto p-4">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-4 mt-[100px]">
            Events and Bootcamps
          </h2>
          <Slideshow cards={cards} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
