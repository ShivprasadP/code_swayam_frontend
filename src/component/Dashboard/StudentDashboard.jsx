import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import StudentFeatures from "../Features/StudentFeatures";
import EventTable from "../Events/EventTable";

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.role === "Student") {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a student to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

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
      <EventTable />
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
