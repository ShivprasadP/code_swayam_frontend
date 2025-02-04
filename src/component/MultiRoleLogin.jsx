import { useState } from "react";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ loginData, setLoginData, handleLogin }) => (
  <div className="w-full md:w-1/2 flex flex-col items-center p-6 bg-transparent">
    <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
    <div className="w-full space-y-4">
      <input
        type="text"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        aria-label="Email"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        aria-label="Password"
      />
      <button
        className="w-full bg-gradient-to-b from-amber-500 to-orange-400 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
        onClick={handleLogin}
        aria-label="Login"
      >
        Login
      </button>
    </div>
  </div>
);

LoginForm.propTypes = {
  loginData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setLoginData: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

const MultiRoleLogin = ({ onClose }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData
      );

      toast.success("Login successful!");
      if (response.data.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "Faculty") {
        navigate("/faculty-dashboard");
      } else if (response.data.role === "Student") {
        navigate("/student-dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-gray-300">
        <button
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        </button>

        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-300 to-orange-300 text-white">
          <UserCircleIcon className="w-24 h-24 text-black mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome!</h2>
          <p className="text-center text-gray-800">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Right Section */}
        <LoginForm
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
        />
      </div>
      <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
};

MultiRoleLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MultiRoleLogin;
