import React, { useState } from "react";

function AdminMIS() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [misResults, setMisResults] = useState([]);

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

export default AdminMIS;
