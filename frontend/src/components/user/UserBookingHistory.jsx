import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function UserBookingHistory() {
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          fetchBookingHistory(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchBookingHistory = async (userId) => {
    try {
      let response;
      if (UserService.isAdmin()) {
        response = await MealBookingService.getAllBookings(userId);
      } else {
        response = await MealBookingService.getUserBookingsForDate(userId, "");
      }
      setBookingHistory(response.bookingList || []);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const filterBookingsByMonth = (bookings, monthYear) => {
    const [year, month] = monthYear.split("-");
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getFullYear() === parseInt(year) &&
        bookingDate.getMonth() === parseInt(month) - 1
      );
    });
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredBookings = filterBookingsByMonth(bookingHistory, selectedMonth);
  const sortedBookings = sortBookings(filteredBookings, sortOrder);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Booking History
      </h2>
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <label
            htmlFor="month-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Month
          </label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={handleSort}
              >
                Date
                <span className="ml-2 inline-block">
                  {sortOrder === "asc" ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Number of Meals
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBookings.map((booking) => (
              <tr key={booking.bookId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.bookId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.mealCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.cancelled
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {booking.cancelled ? "Cancelled" : "Booked"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
