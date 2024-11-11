// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { useAuth } from "../../AuthContext";
// import "../../style.css";

// export default function Navbar() {
//   const { isAuthenticated, isAdmin, updateAuthStatus } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to logout this user?"
//     );
//     if (confirmDelete) {
//       UserService.logout();
//       updateAuthStatus();
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">MyApp</div>
//       <ul className="navbar-links">
//         {!isAuthenticated && (
//           <li>
//             <Link to="/">CMS</Link>
//           </li>
//         )}
//         {isAuthenticated && (
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//         )}
//         {isAuthenticated && (
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         )}
//         {isAuthenticated && (
//           <li>
//             <Link to="/history">Booking History</Link>
//           </li>
//         )}
//         {isAdmin && (
//           <li>
//             <Link to="/admin/user-management">User Management</Link>
//           </li>
//         )}
//         {isAuthenticated && (
//           <li>
//             <Link to="/" onClick={handleLogout}>
//               Logout
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../AuthContext";
// import { useTheme } from "../../ThemeContext";
import { MenuIcon, XIcon, SunIcon, MoonIcon } from "@heroicons/react/outline";

export default function Navbar() {
  const { isAuthenticated, isAdmin, updateAuthStatus } = useAuth();
  // const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (confirmDelete) {
      UserService.logout();
      updateAuthStatus();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">BiteBooking</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {!isAuthenticated && (
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                )}
                {isAuthenticated && (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/history"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Booking History
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/admin/user-management"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    User Management
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              onClick={toggleTheme}
              className="bg-gray-700 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button> */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-3 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {!isAuthenticated && (
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/history"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Booking History
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin/user-management"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              User Management
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
