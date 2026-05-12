import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery }) => {
  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const location = useLocation();
  return (
    <header className="w-full bg-[#f6f7f8] border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2">
        {/* Logo */}
        <Link to="/">
          <div>
            <img
              src="../img/meetuplogo.png"
              alt="Meetup Logo"
              className="h-20 object-contain cursor-pointer"
            />
          </div>
        </Link>

        {/* Search Bar */}
        {!location.pathname.includes("/EventDetails") && (
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 w-[320px] shadow-sm">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search by title and tags"
              value={searchQuery}
              onChange={searchHandler}
              className="w-full outline-none text-gray-500 placeholder:text-gray-400 bg-transparent"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
