import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import StudentFeatures from "../Features/StudentFeatures";

const StudentDashboard = () => {
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
        Welcome <span className="text-amber-600"> Student !</span>
      </h1>
      <StudentFeatures />
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
