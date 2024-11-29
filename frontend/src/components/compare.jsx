import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../AuthContext";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "./logo.gif";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, updateAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userProfile = await UserService.getYourProfile(token);
      setUserName(userProfile.user.name);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (confirmDelete) {
      UserService.logout();
      updateAuthStatus();
      navigate("/");
    }
  };

  return (
    <nav className={`bg-gray-800 dark:bg-gray-900 ${isOpen ? "pb-3" : ""}`}>
      <div className="max-w-8xl px-2 sm:px-6 lg:px-8 lg:mr-20 lg:ml-5">
        <div className="relative flex items-center justify-between h-16 lg:h-32">
          <div className="flex-shrink-0 flex items-center">
            <div className="w-12 h-12 lg:w-32 lg:h-32 mr-3">
              <img
                src={logo}
                alt="NBEMS स्वाद logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl">NBEMS स्वाद</span>
              <span className="text-white font-bold text-xs">
                (Service Window to Access Delicious food)
              </span>
            </div>
          </div>
          <div className="hidden sm:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="ml-6">
              <div className="flex space-x-4">
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
            <div className="hidden sm:block">
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
                  <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    Welcome, {userName}
                  </span>
                  <button
                    onClick={toggleLanguage}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {language === "en" ? "हिंदी" : "English"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center sm:hidden ml-2">
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
              <span className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                Welcome, {userName}
              </span>
              <button
                onClick={toggleLanguage}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {language === "en" ? "हिंदी" : "English"}
              </button>
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
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
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
        </div>
      </div>
    </nav>
  );
}
