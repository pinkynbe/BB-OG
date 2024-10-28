import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";

export default function TatkalBooking() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [mealCount, setMealCount] = useState(1);

  useEffect(() => {
    fetchUsers();
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

  useEffect(() => {
    // Fetch users from API
    // This is a placeholder, replace with actual API call
    const fetchUsers = async () => {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement emergency booking logic here
    console.log("Emergency booking submitted", { selectedUser, mealCount });
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    User
                  </label>
                  <select
                    className="form-select"
                    id="user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
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
