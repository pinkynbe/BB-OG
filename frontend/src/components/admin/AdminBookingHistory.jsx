import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

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
      const token = localStorage.getItem("token");
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

  const renderTable = () => {
    return (
      <>
        <h3 className="mb-3">
          Booking History for{" "}
          {selectedUser
            ? users.find((u) => u.id === selectedUser)?.name
            : "All Users"}
        </h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>User Name</th>
              <th>Number of Meals</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookId}>
                <td>{booking.bookId}</td>
                <td>{booking.date}</td>
                <td>{booking.user.name}</td>
                <td>{booking.mealCount}</td>
                <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Booking History</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="from-date" className="form-label">
            From Date
          </label>
          <input
            type="date"
            id="from-date"
            className="form-control"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="to-date" className="form-label">
            To Date
          </label>
          <input
            type="date"
            id="to-date"
            className="form-control"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div className="col-md-3">
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
      </div>
      <div className="table-responsive">{renderTable()}</div>
    </div>
  );
}
