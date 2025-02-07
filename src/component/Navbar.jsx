import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = ({ onLoginClick, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
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
        <ul className="hidden md:flex space-x-8 text-base font-medium text-gray-700">
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer ml-[40px]">
            <Link to="/">Home</Link>
          </li>
          {user && user.role === "Student" && (
            <>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/student-dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/practice">Practice</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/rank">Ranking</Link>
              </li>
            </>
          )}
          {user && user.role === "Admin" && (
            <>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/admin-dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/coordinator-management">Coordinator Management</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/activity-management">Activity Management</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/faculty-management">Faculty Management</Link>
              </li>
            </>
          )}
          {user && user.role === "Faculty" && (
            <>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/faculty-dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/student-management">Student Management</Link>
              </li>
            </>
          )}
          {user && user.coordinator_role && (
            <>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/student-requests">Student Requests</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/event_management">Event Management</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/bootcamp-management">Bootcamp Management</Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/problem-statement-management">
                  Problem Statements
                </Link>
              </li>
              <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                <Link to="/add-test-case">Test Case Management</Link>
              </li>
            </>
          )}
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
            <Link to="/feedback">Feedback</Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:block">
        {user ? (
          <button
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            onClick={onLoginClick}
          >
            Login/Signup
          </button>
        )}
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
          <ul className="flex flex-col items-center space-y-4 py-4 text-base font-medium text-gray-700">
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            {user && user.role === "Student" && (
              <>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/student-dashboard" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/practice" onClick={toggleMenu}>
                    Practice
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/rank" onClick={toggleMenu}>
                    Ranking
                  </Link>
                </li>
              </>
            )}
            {user && user.role === "Admin" && (
              <>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/admin-dashboard" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/coordinator-management" onClick={toggleMenu}>
                    Coordinator Management
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/activity-management" onClick={toggleMenu}>
                    Activity Management
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/faculty-management" onClick={toggleMenu}>
                    Faculty Management
                  </Link>
                </li>
              </>
            )}
            {user && user.role === "Faculty" && (
              <>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/faculty-dashboard" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/student-management" onClick={toggleMenu}>
                    Student Management
                  </Link>
                </li>
              </>
            )}
            {user && user.coordinator_role && (
              <>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/student-requests" onClick={toggleMenu}>
                    Student Requests
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/event_management" onClick={toggleMenu}>
                    Event Management
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/bootcamp-management" onClick={toggleMenu}>
                    Bootcamp Management
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/problem-statement-management" onClick={toggleMenu}>
                    Problem Statements
                  </Link>
                </li>
                <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
                  <Link to="/add-test-case" onClick={toggleMenu}>
                    Test Case Management
                  </Link>
                </li>
              </>
            )}
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/profile" onClick={toggleMenu}>
                Profile
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
            <li className="hover:text-amber-500 transition-all duration-300 cursor-pointer">
              <Link to="/feedback" onClick={toggleMenu}>
                Feedback
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300"
                  onClick={onLoginClick}
                >
                  Login/Signup
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
