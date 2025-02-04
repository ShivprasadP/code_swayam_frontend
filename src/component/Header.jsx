import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLoginClick }) => {
  return (
    <div
      id="header"
      className="flex items-center justify-between p-4 bg-white shadow-lg fixed top-0 left-0 w-full z-50 bottom-170"
    >
      <div className="flex items-center space-x-6 ml-8">
        <img
          src="/images/logo4.png"
          alt="Logo"
          className="w-40 h-auto mt-[45px]"
        />
        <ul className="flex space-x-8 text-lg font-medium text-gray-700">
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer ml-[40px]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-300 ml-[30px] cursor-pointer">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer ml-[30px]">
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div>
        <button
          className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
          onClick={onLoginClick}
        >
          Login/Signup
        </button>
      </div>
    </div>
  );
};

export default Header;
