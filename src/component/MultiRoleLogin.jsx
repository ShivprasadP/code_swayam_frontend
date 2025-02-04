import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import bgimage from "../assets/bg3.jpg";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLogin = () => {
    alert(`Logging in with Username: ${loginData.username}`);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
    >
      <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-300 to-orange-300 text-white">
          <UserCircleIcon className="w-24 h-24 text-black mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
          <p className="text-center text-black">Enter your credentials to access your account</p>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-6 bg-transparent">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
          <div className="w-full space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              className="w-full bg-gradient-to-b from-amber-500 to-orange-400 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
