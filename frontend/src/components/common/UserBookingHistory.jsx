import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function UserBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking History</h2>
      <div className="table-responsive">
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
            {bookingHistory.map((booking) => (
              <tr key={booking.bookId}>
                <td>{booking.bookId}</td>
                <td>{booking.date}</td>
                <td>{booking.mealCount}</td>
                <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
