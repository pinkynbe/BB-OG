import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function MIS() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [misResults, setMisResults] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [users, setUsers] = useState([]);

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

    fetchUsers();
    fetchUserInfo();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.userList); // Assuming the list of users is under the key 'userList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement MIS report generation logic here
    // This is a placeholder, replace with actual API call
    const response = await fetch(`/api/admin/mis?month=${selectedMonth}`);
    const data = await response.json();
    setMisResults(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Monthly Booking Summary</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="month"
                className="form-control"
                id="monthInput"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Total Bookings</th>
              <th>Total Meals</th>
              <th>Cancellations</th>
            </tr>
          </thead>
          <tbody>
            {misResults.map((result) => (
              <tr key={result.date}>
                <td>{result.date}</td>
                <td>{result.totalBookings}</td>
                <td>{result.totalMeals}</td>
                <td>{result.cancellations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
