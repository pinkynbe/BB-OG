import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function AdminBookingHistory() {
  const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      fromDate: firstDay.toISOString().split("T")[0],
      toDate: lastDay.toISOString().split("T")[0],
    };
  };

  const [fromDate, setFromDate] = useState(getCurrentMonthDates().fromDate);
  const [toDate, setToDate] = useState(getCurrentMonthDates().toDate);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField, setSortField] = useState("date");

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchBookings();
    }
  }, [fromDate, toDate, selectedUser, adminId]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const profileResponse = await UserService.getYourProfile(token);
      setAdminId(profileResponse.user.id);
      const usersResponse = await UserService.getAllUsers(token);
      setUsers(usersResponse.userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      let response;

      if (selectedUser) {
        response = await MealBookingService.getUserBookingsForDate(
          selectedUser,
          ""
        );
      } else {
        response = await MealBookingService.getAllBookings(adminId);
      }

      const filteredBookings = filterBookingsByDate(response.bookingList || []);
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const filterBookingsByDate = (bookings) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= start && bookingDate <= end;
    });
  };

  const handleFromDateChange = (event) => setFromDate(event.target.value);
  const handleToDateChange = (event) => setToDate(event.target.value);
  const handleUserChange = (event) => setSelectedUser(event.target.value);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortBookings = (bookings) => {
    return bookings.sort((a, b) => {
      let comparison = 0;
      if (sortField === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortField === "userName") {
        comparison = a.user.name.localeCompare(b.user.name);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const sortedBookings = sortBookings([...bookings]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        User Booking History
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="from-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            From Date
          </label>
          <input
            type="date"
            id="from-date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div>
          <label
            htmlFor="to-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To Date
          </label>
          <input
            type="date"
            id="to-date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div>
          <label
            htmlFor="userSelect"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select User
          </label>
          <select
            id="userSelect"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.pan}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Booking History for{" "}
            {selectedUser
              ? users.find((u) => u.id === selectedUser)?.name
              : "All Users"}
          </h3>
        </div>
        <div className="border-t border-gray-200">
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
                  onClick={() => handleSort("date")}
                >
                  Date
                  <span className="ml-2 inline-block">
                    {sortField === "date" &&
                      (sortOrder === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("userName")}
                >
                  User Name
                  <span className="ml-2 inline-block">
                    {sortField === "userName" &&
                      (sortOrder === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      ))}
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
                    {booking.user.name}
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
    </div>
  );
}
