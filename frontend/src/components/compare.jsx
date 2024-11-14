import React, { useState, useEffect } from "react";
import { Document, Page } from "@react-pdf-viewer";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MenuIcon,
} from "@heroicons/react/solid";

export default function UserDashboard() {
  const [date, setDate] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [bookingType, setBookingType] = useState("single");
  const [menuUrl, setMenuUrl] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
          fetchBookingHistory(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await fetch("https://localhost:8085/api/menu/latest");
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setMenuUrl(url);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
    fetchUserInfo();
  }, []);

  const getNextMonday = () => {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    return nextMonday.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (bookingType === "week") {
      setDate(getNextMonday());
    } else {
      setDate("");
    }
  }, [bookingType]);

  const handleZoomIn = () => setZoom((prevZoom) => prevZoom + 0.2);
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 0.2));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className=" flex gap-2">
          <div className="w-4/6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-white">
                  Book a Meal
                </h2>
              </div>
              {/* Booking form code remains the same */}
            </div>
          </div>

          {/* Menu display section with zoom controls */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-white flex items-center">
                <MenuIcon className="h-5 w-5 mr-2" />
                This Week's Menu
              </h2>
            </div>
            <div className="px-3 py-3 sm:p-6">
              {menuUrl ? (
                <div className="flex flex-col items-center">
                  <div className="flex space-x-4 mb-2">
                    <button
                      onClick={handleZoomOut}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Zoom Out
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Zoom In
                    </button>
                  </div>
                  <div
                    className="bg-gray-50 p-2 rounded-md overflow-scroll"
                    style={{ maxWidth: "100%", maxHeight: "600px" }}
                  >
                    <Document file={menuUrl}>
                      <Page pageNumber={1} scale={zoom} />
                    </Document>
                  </div>
                </div>
              ) : (
                <p>Loading menu...</p>
              )}
            </div>
          </div>
        </div>

        {/* Bookings table code remains the same */}
      </div>
    </div>
  );
}
