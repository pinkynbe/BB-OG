import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/solid";

export default function MIS() {
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [summary, setSummary] = useState({
    totalMeals: 0,
    cancelledMeals: 0,
    confirmedMeals: 0,
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchBookings();
    }
  }, [selectedMonth, selectedUser, adminId]);

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
      const filteredBookings = filterBookingsByMonth(
        response.bookingList || [],
        selectedMonth
      );

      const userBookings = filteredBookings.filter(
        (booking) => booking.user.role !== "ADMIN"
      );
      const adminBookings = filteredBookings.filter(
        (booking) => booking.user.role === "ADMIN"
      );

      setBookings(userBookings);
      setAdminBookings(adminBookings);
      updateSummary(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
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

  const updateSummary = (filteredBookings) => {
    const totalMeals = filteredBookings.reduce(
      (sum, booking) => sum + booking.mealCount,
      0
    );
    const cancelledMeals = filteredBookings
      .filter((booking) => booking.cancelled)
      .reduce((sum, booking) => sum + booking.mealCount, 0);
    const confirmedMeals = totalMeals - cancelledMeals;
    setSummary({ totalMeals, cancelledMeals, confirmedMeals });
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    try {
      const response = await MealBookingService.getUserBookingsForDate(
        userId,
        ""
      );
      const filteredBookings = filterBookingsByMonth(
        response.bookingList || [],
        selectedMonth
      );
      setBookings(filteredBookings);
      setAdminBookings([]);
      updateSummary(filteredBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const groupBookingsByUser = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const userId = booking.user.id;
      if (!acc[userId]) {
        acc[userId] = {
          id: userId,
          name: booking.user.name,
          pan: booking.user.pan,
          totalMeals: 0,
          cancelledMeals: 0,
          confirmedMeals: 0,
        };
      }
      acc[userId].totalMeals += booking.mealCount;
      if (booking.cancelled) {
        acc[userId].cancelledMeals += booking.mealCount;
      } else {
        acc[userId].confirmedMeals += booking.mealCount;
      }
      return acc;
    }, {});
  };

  const getSelectedUserName = () => {
    if (!selectedUser) return "All Users";
    const user = users.find((u) => u.id === selectedUser);
    return user ? user.name : "Selected User";
  };

  const exportToExcel = async () => {
    const selectedUserName = getSelectedUserName();
    const title = `Bookings for ${selectedUserName}`;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Meal Bookings");

    let headers, data;
    if (selectedUser) {
      headers = ["Booking ID", "Date", "Number of Meals", "Status"];
      data = bookings.map((booking) => [
        booking.bookId,
        booking.date,
        booking.mealCount,
        booking.cancelled ? "Cancelled" : "Booked",
      ]);
    } else {
      headers = [
        "User Name",
        "PAN",
        "Total Meals",
        "Cancelled Meals",
        "Confirmed Meals",
      ];
      const groupedBookings = groupBookingsByUser(bookings);
      data = Object.values(groupedBookings).map((user) => [
        user.name,
        user.pan,
        user.totalMeals,
        user.cancelledMeals,
        user.confirmedMeals,
      ]);
    }

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { bold: true, size: 14 };
    worksheet.mergeCells(`A1:${String.fromCharCode(65 + headers.length - 1)}1`);

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true, size: 12 };

    data.forEach((rowData) => worksheet.addRow(rowData));

    worksheet.columns = headers.map((header) => ({
      width: header.length < 15 ? 15 : header.length + 5,
    }));

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = selectedUser
      ? `Meal_Bookings_${selectedUserName}_${selectedMonth}.xlsx`
      : `Meal_Bookings_All_Users_${selectedMonth}.xlsx`;

    saveAs(new Blob([buffer]), fileName);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const renderTable = () => {
    const selectedUserName = getSelectedUserName();
    const sortedData = getSortedData(
      selectedUser ? bookings : Object.values(groupBookingsByUser(bookings))
    );

    return (
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Bookings for {selectedUserName}
          </h3>
          <button
            onClick={exportToExcel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentDownloadIcon
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            Export to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {selectedUser ? (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Booking ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Number of Meals
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("name")}
                    >
                      User Name
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-5 h-5 inline-block ml-1" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 inline-block ml-1" />
                        ))}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      PAN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("totalMeals")}
                    >
                      Total Meals
                      {sortConfig.key === "totalMeals" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-5 h-5 inline-block ml-1" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 inline-block ml-1" />
                        ))}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("cancelledMeals")}
                    >
                      Cancelled Meals
                      {sortConfig.key === "cancelledMeals" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-5 h-5 inline-block ml-1" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 inline-block ml-1" />
                        ))}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("confirmedMeals")}
                    >
                      Confirmed Meals
                      {sortConfig.key === "confirmedMeals" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-5 h-5 inline-block ml-1" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 inline-block ml-1" />
                        ))}
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedData.map((item) => (
                <tr key={selectedUser ? item.bookId : item.id}>
                  {selectedUser ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.bookId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.mealCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.cancelled
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {item.cancelled ? "Cancelled" : "Booked"}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <button
                          onClick={() => handleUserClick(item.id)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {item.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.pan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.totalMeals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.cancelledMeals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.confirmedMeals}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAdminBookingsTable = () => {
    return (
      <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            Admin Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Booking ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Admin Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Number of Meals
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Remark
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {adminBookings.map((booking) => (
                  <tr key={booking.bookId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {booking.bookId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.mealCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.event || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.remark || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.cancelled
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Monthly Meal Booking Summary
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div>
          <label
            htmlFor="month-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Select Month
          </label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="userSelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Select User
          </label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Meals Booked
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {summary.totalMeals}
            </dd>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Confirmed Meals
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {summary.confirmedMeals}
            </dd>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Cancelled Meals
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {summary.cancelledMeals}
            </dd>
          </div>
        </div>
      </div>
      {renderTable()}
      {!selectedUser && adminBookings.length > 0 && renderAdminBookingsTable()}
    </div>
  );
}
