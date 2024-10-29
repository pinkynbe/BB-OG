import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function AdminDashboard() {
  const [todayBookings, setTodayBookings] = useState(0);
  const [todayCancellations, setTodayCancellations] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
          fetchTodayBooking(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchTodayBooking = async (userId) => {
    try {
      const date = new Date();
      const today = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      const response = await MealBookingService.getTodayBookings(userId, today);

      const confirmedMeals = response.bookingList.reduce(
        (sum, booking) => (!booking.cancelled ? sum + booking.mealCount : sum),
        0
      );
      const cancelledMeals = response.bookingList.reduce(
        (sum, booking) => (booking.cancelled ? sum + booking.mealCount : sum),
        0
      );

      setTodayBookings(confirmedMeals);
      setTodayCancellations(cancelledMeals);

      const activeBookings = response.bookingList.filter(
        (booking) => !booking.cancelled
      );
      const sortedBookings = sortBookings(activeBookings, sortOrder);
      setBookingHistory(sortedBookings);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const handleCancelMeal = async (bookingId, bookingDate) => {
    try {
      const confirmCancel = window.confirm("Are you sure you want to cancel?");
      if (confirmCancel) {
        await MealBookingService.cancelBooking(currentUserId, bookingId);
        alert("Meal cancelled successfully!");
        fetchTodayBooking(currentUserId);
      }
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setBookingHistory(sortBookings([...bookingHistory], newOrder));
  };

  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const nameA = a.user.name.toLowerCase();
      const nameB = b.user.name.toLowerCase();
      if (nameA < nameB) return order === "asc" ? -1 : 1;
      if (nameA > nameB) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Today's Confirmed Meals</h5>
              <p className="card-text display-4">{todayBookings}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Today's Cancelled Meals</h5>
              <p className="card-text display-4">{todayCancellations}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link
                  to="/admin/bulk-booking"
                  className="btn btn-primary me-md-2"
                >
                  Bulk Booking
                </Link>
                <Link
                  to="/admin/tatkal-booking"
                  className="btn btn-danger me-md-2"
                >
                  Emergency Booking
                </Link>
                <Link to="/admin/mis" className="btn btn-info">
                  Generate MIS Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Today's Active Bookings</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Booking ID</th>
                      <th className="cursor-pointer" onClick={handleSort}>
                        Name{" "}
                        <span className="ml-2">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      </th>
                      <th>Date</th>
                      <th>Number of Meals</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((booking) => (
                      <tr key={booking.bookId}>
                        <td>{booking.bookId}</td>
                        <td>{booking.user.name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.mealCount}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleCancelMeal(booking.bookId, booking.date)
                            }
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
