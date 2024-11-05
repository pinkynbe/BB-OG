// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function UserBookingHistory() {
//   const getCurrentMonthYear = () => {
//     const now = new Date();
//     return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   const [bookingHistory, setBookingHistory] = useState([]);
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

//     fetchUserInfo();
//   }, []);

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
//       <h2 className="text-center mb-4">Booking History</h2>
//       <div className="mb-4">
//         <label htmlFor="month-select" className="mr-2">
//           Select Month:
//         </label>
//         <input
//           type="month"
//           id="month-select"
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           className="form-control"
//           style={{ width: "auto", display: "inline-block" }}
//         />
//       </div>
//       <div className="table-responsive">
//         <table className="table table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Booking ID</th>
//               <th>Date</th>
//               <th>Number of Meals</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
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

import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function UserBookingHistory() {
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [sortOrder, setSortOrder] = useState("desc");

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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredBookings = filterBookingsByMonth(bookingHistory, selectedMonth);
  const sortedBookings = sortBookings(filteredBookings, sortOrder);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking History</h2>
      <div className="mb-4">
        <label htmlFor="month-select" className="mr-2">
          Select Month:
        </label>
        <input
          type="month"
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="form-control"
          style={{ width: "auto", display: "inline-block" }}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th className="cursor-pointer" onClick={handleSort}>
                Date
                <span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
              </th>
              <th>Number of Meals</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking) => (
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
