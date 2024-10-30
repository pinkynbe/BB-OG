import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver"; // Install file-saver if not already installed

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
  const [summary, setSummary] = useState({
    totalMeals: 0,
    cancelledMeals: 0,
    confirmedMeals: 0,
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
      setBookings(filteredBookings);
      updateSummary(filteredBookings);
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

    // Define the headers and data based on whether a specific user is selected
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

    // Title row with styling
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { bold: true, size: 14 };
    worksheet.mergeCells(`A1:${String.fromCharCode(65 + headers.length - 1)}1`);

    // Add headers row with styling
    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true, size: 12 };

    // Add data rows
    data.forEach((rowData) => worksheet.addRow(rowData));

    // Adjust column widths
    worksheet.columns = headers.map((header) => ({
      width: header.length < 15 ? 15 : header.length + 5,
    }));

    // Export workbook to file
    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = selectedUser
      ? `Meal_Bookings_${selectedUserName}_${selectedMonth}.xlsx`
      : `Meal_Bookings_All_Users_${selectedMonth}.xlsx`;

    saveAs(new Blob([buffer]), fileName);
  };

  const renderTable = () => {
    const selectedUserName = getSelectedUserName();
    return (
      <>
        <h3 className="mb-3">Bookings for {selectedUserName}</h3>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={exportToExcel}>
            Export to Excel
          </button>
        </div>
        {selectedUser ? (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Number of Meals</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookId}>
                  <td>{booking.bookId}</td>
                  <td>{booking.date}</td>
                  <td>{booking.mealCount}</td>
                  <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>PAN</th>
                <th>Total Meals</th>
                <th>Cancelled Meals</th>
                <th>Confirmed Meals</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(groupBookingsByUser(bookings)).map((data) => (
                <tr key={data.id}>
                  <td>
                    <button
                      className="btn btn-link p-0"
                      onClick={() => handleUserClick(data.id)}
                    >
                      {data.name}
                    </button>
                  </td>
                  <td>{data.pan}</td>
                  <td>{data.totalMeals}</td>
                  <td>{data.cancelledMeals}</td>
                  <td>{data.confirmedMeals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Monthly Meal Booking Summary</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="month-select" className="form-label">
                Select Month
              </label>
              <input
                type="month"
                id="month-select"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userSelect" className="form-label">
                Select User
              </label>
              <select
                id="userSelect"
                className="form-select"
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
          </form>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Meals Booked</h5>
              <p className="card-text">{summary.totalMeals}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Confirmed Meals</h5>
              <p className="card-text">{summary.confirmedMeals}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cancelled Meals</h5>
              <p className="card-text">{summary.cancelledMeals}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">{renderTable()}</div>
    </div>
  );
}
