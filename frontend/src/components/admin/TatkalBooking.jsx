import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import MealBookingService from "../service/MealBookingService";

export default function TatkalBooking() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching users. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setMessage("Please select a user.");
      return;
    }
    try {
      const bookingData = {
        date: new Date().toISOString().split("T")[0],
        mealCount: mealCount,
      };
      await MealBookingService.bookMeal(selectedUser, bookingData);
      setMessage("Emergency meal booked successfully!");
      setSelectedUser("");
      setMealCount(1);
    } catch (error) {
      console.error("Error booking emergency meal:", error);
      setMessage("Error booking emergency meal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h2 className="text-center">Emergency Booking</h2>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userSelect" className="form-label">
                    Select User
                  </label>
                  <select
                    id="userSelect"
                    className="form-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.pan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="emergencyMealCount" className="form-label">
                    Number of Meals
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="emergencyMealCount"
                    min="1"
                    value={mealCount}
                    onChange={(e) => setMealCount(parseInt(e.target.value))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Book Emergency Meal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
