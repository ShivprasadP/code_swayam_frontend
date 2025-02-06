import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-amber-50 text-black py-10 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo and About */}
        <div>
          <img src="/images/logo4.png" alt="CodeSwayam Logo" className="w-40 h-auto" />
          <p className="mt-3 text-gray-700 text-sm">
            Empowering developers with learning,coding & Exploring.
          </p>
        </div>

        {/* Our Services */}
        <div>
          <h2 className="text-lg font-semibold text-amber-500">Our Services</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>E-Learning</li>
            <li>Events & Bootcamps</li>
            <li>Workshops & Webinars</li>
            <li>Online Code Compiler</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-lg font-semibold text-amber-500">Tech Stack</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>React.js & Next.js</li>
            <li>Node.js & Express</li>
            <li>MongoDB & Sqlite</li>
            <li>Tailwind CSS & Bootstrap</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-amber-500">Contact Us</h2>
          <address className="mt-3 text-gray-700">KIT road, Kolhapur</address>
          <p className="text-gray-700">Phone: +91 7375807178</p>
          <p className="text-gray-700">Email: support@codeswayam.com</p>
          <div className="flex space-x-4 mt-3 text-black-600">
            <FaFacebook size={24} className="cursor-pointer hover:text-blue-500" />
            <FaTwitter size={24} className="cursor-pointer hover:text-blue-300" />
            <FaLinkedin size={24} className="cursor-pointer hover:text-blue-700" />
          </div>
        </div>
      </div>
      
      <div className="text-center text-white text-sm mt-8 border-t bg-black border-gray-300 pt-4">
        &copy; {new Date().getFullYear()} CodeSwayam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
