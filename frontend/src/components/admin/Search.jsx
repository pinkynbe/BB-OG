import React, { useState } from "react";

function AdminSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement search logic here
    // This is a placeholder, replace with actual API call
    const response = await fetch(`/api/admin/search?q=${searchQuery}`);
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Search Bookings</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Search by user or date"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Number of Meals</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user}</td>
                <td>{booking.date}</td>
                <td>{booking.mealCount}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSearch;
