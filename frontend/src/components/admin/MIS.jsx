import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

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
    total: 0,
    cancelled: 0,
    confirmed: 0,
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
      // const token = localStorage.getItem("token");
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
    const total = filteredBookings.length;
    const cancelled = filteredBookings.filter(
      (booking) => booking.cancelled
    ).length;
    const confirmed = total - cancelled;
    setSummary({ total, cancelled, confirmed });
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
      // const token = localStorage.getItem("token");
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
          total: 0,
          cancelled: 0,
          confirmed: 0,
        };
      }
      acc[userId].total++;
      if (booking.cancelled) {
        acc[userId].cancelled++;
      } else {
        acc[userId].confirmed++;
      }
      return acc;
    }, {});
  };

  const renderTable = () => {
    if (selectedUser) {
      return (
        <>
          <h3 className="mb-3">
            Bookings for{" "}
            {users.find((u) => u.id === selectedUser)?.name || "Selected User"}
          </h3>
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
        </>
      );
    } else {
      const groupedBookings = groupBookingsByUser(bookings);
      return (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>User Name</th>
              <th>PAN</th>
              <th>Total Bookings</th>
              <th>Cancelled Bookings</th>
              <th>Confirmed Bookings</th>
            </tr>
          </thead>
          <tbody>
            {/* {Object.entries(groupedBookings).map(([userId, data]) => (
              <tr key={userId}>
                <td>{data.name}</td> */}
            {Object.values(groupedBookings).map((data) => (
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
                <td>{data.total}</td>
                <td>{data.cancelled}</td>
                <td>{data.confirmed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Monthly Booking Summary</h2>
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
              <h5 className="card-title">Total Bookings</h5>
              <p className="card-text">{summary.total}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Confirmed Bookings</h5>
              <p className="card-text">{summary.confirmed}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cancelled Bookings</h5>
              <p className="card-text">{summary.cancelled}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">{renderTable()}</div>
    </div>
  );
}
