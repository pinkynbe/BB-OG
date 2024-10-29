import React, { useState } from "react";

export default function Search() {
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

// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function MIS() {
//   //added
//   const getCurrentMonthYear = () => {
//     const now = new Date();
//     return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   // const [selectedMonth, setSelectedMonth] = useState("");
//   const [misResults, setMisResults] = useState([]);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         if (UserService.isAuthenticated()) {
//           const token = localStorage.getItem("token");
//           const userProfile = await UserService.getYourProfile(token);
//           fetchBookingHistory(userProfile.user.id);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUsers();
//     fetchUserInfo();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await UserService.getAllUsers(token);
//       setUsers(response.userList);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchBookingHistory = async (userId) => {
//     try {
//       let response;
//       if (UserService.isAdmin()) {
//         response = await MealBookingService.getAllBookings(userId);
//       } else {
//         response = await MealBookingService.getUserBookingsForDate(userId, "");
//       }
//       setBookingHistory(response.bookingList || []);
//     } catch (error) {
//       console.error("Error fetching booking history:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`/api/admin/mis?month=${selectedMonth}`);
//     const data = await response.json();
//     setMisResults(data);
//   };

//   const handleUserChange = (e) => {
//     setSelectedUser(e.target.value);
//     // You can add additional logic here, such as fetching data for the selected user
//   };

//   //added
//   const filterBookingsByMonth = (bookings, monthYear) => {
//     const [year, month] = monthYear.split("-");
//     return bookings.filter((booking) => {
//       const bookingDate = new Date(booking.date);
//       return (
//         bookingDate.getFullYear() === parseInt(year) &&
//         bookingDate.getMonth() === parseInt(month) - 1
//       );
//     });
//   };

//   const handleMonthChange = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const filteredBookings = filterBookingsByMonth(bookingHistory, selectedMonth);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Monthly Booking Summary</h2>
//       <div className="row justify-content-center mb-4">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               {/* <label htmlFor="monthInput" className="form-label">
//                 Select Month
//               </label> */}
//               <label htmlFor="month-select" className="mr-2">
//                 Select Month:
//               </label>
//               <div className="input-group">
//                 {/* <input
//                   type="month"
//                   className="form-control"
//                   id="monthInput"
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   required
//                 /> */}
//                 <input
//                   type="month"
//                   id="month-select"
//                   value={selectedMonth}
//                   onChange={handleMonthChange}
//                   className="form-control"
//                   style={{ width: "auto", display: "inline-block" }}
//                   required
//                 />
//                 <button className="btn btn-primary" type="submit">
//                   Generate Report
//                 </button>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="userSelect" className="form-label">
//                 Select User
//               </label>
//               <select
//                 id="userSelect"
//                 className="form-select"
//                 value={selectedUser}
//                 onChange={handleUserChange}
//               >
//                 <option value="">Select a user</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} - {user.pan}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>Total Bookings</th>
//               <th>Total Meals</th>
//               <th>Cancellations</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {misResults.map((result) => (
//               <tr key={result.date}>
//                 <td>{result.date}</td>
//                 <td>{result.totalBookings}</td>
//                 <td>{result.totalMeals}</td>
//                 <td>{result.cancellations}</td>
//               </tr>
//             ))} */}
//             {filteredBookings.map((booking) => (
//               <tr key={booking.bookId}>
//                 <td>{booking.bookId}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.mealCount}</td>
//                 <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
