/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ Link1, Link2 }) => {
  const [isOpen, setIsOpen] = useState(false);

  // navigate to pages
  const navigate = useNavigate();

  function NavlinkName(currentLink) {
    switch (currentLink) {
      case "/history":
        return "Transaction";
        break;
      case "/dashboard":
        return "Dashboard";
        break;
      default:
        return "Home";
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex  justify-between lg: h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">AXIPAYS</span>
          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex l space-x-8">
            <button
              className="text-black  hover:text-blue-600 capitalize  px-3 py-2 lg:text-2x font-medium"
              onClick={() => navigate(Link1)}>
              {NavlinkName(Link1)}
            </button>
            <button
              className="text-black hover:text-blue-600 capitalize px-3 py-2 lg:text-2x font-medium"
              onClick={() => navigate(Link2)}>
              {NavlinkName(Link2)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div
          className={`fixed right-0 rounded-l-lg shadow-lg flex flex-col justify-center  w-35 bg-white z-50
  transform transition-transform duration-500 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button
            className="block w-full  text-left text-black font-medium capitalize bg-gray-50 hover:bg-gray-50 px-3 py-2"
            onClick={() => navigate(Link1)}>
            {NavlinkName(Link1)}
          </button>

          <button
            className="block w-full text-left mb-3 text-black font-medium capitalize hover:bg-gray-50 px-3 py-2"
            onClick={() => navigate(Link2)}>
            {NavlinkName(Link2)}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
