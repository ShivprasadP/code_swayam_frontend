import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="Navbar"
      className="flex items-center justify-between p-4 bg-white shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <div className="flex items-center space-x-6 ml-8">
        <div className="w-20 h-auto">
          <img
            src="/images/logo4.png"
            alt="Logo"
            className="w-full h-full object-contains"
          />
        </div>
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
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

      <div className="hidden md:block">
        <button
          className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
          onClick={onLoginClick}
        >
          Login/Signup
        </button>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-lg font-medium text-gray-700">
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/aboutus" onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/contactus" onClick={toggleMenu}>
                Contact Us
              </Link>
            </li>
            <li>
              <button
                className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
                onClick={() => {
                  onLoginClick();
                  toggleMenu();
                }}
              >
                Login/Signup
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
