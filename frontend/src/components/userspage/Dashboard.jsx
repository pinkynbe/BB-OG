// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function Dashboard() {
//   const [date, setDate] = useState("");
//   const [menuId, setMenuId] = useState("");
//   const [mealCount, setMealCount] = useState(1);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         if (UserService.isAuthenticated()) {
//           const token = localStorage.getItem("token");
//           const userProfile = await UserService.getYourProfile(token);
//           setCurrentUserId(userProfile.user.id);
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

//   const handleBookMeal = async (e) => {
//     e.preventDefault();
//     const now = new Date();
//     const bookingDeadline = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       23,
//       15,
//       59
//     );

//     if (now > bookingDeadline) {
//       alert("Booking is only allowed until 11:15 AM.");
//       return;
//     }

//     try {
//       await MealBookingService.bookMeal(currentUserId, {
//         date,
//         menuId,
//         mealCount,
//       });
//       alert("Meal booked successfully!");
//       fetchBookingHistory(currentUserId);
//     } catch (error) {
//       console.error("Error booking meal:", error);
//       alert("Failed to book meal. Please try again.");
//     }
//   };

//   const handleCancelMeal = async (bookingId) => {
//     const now = new Date();
//     const cancellationDeadline = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       23,
//       0,
//       0
//     );

//     if (now > cancellationDeadline) {
//       alert("Meal cancellation is only allowed until 11:00 AM.");
//       return;
//     }

//     try {
//       // Prompt for confirmation before cancelling
//       const confirmCancel = window.confirm("Are you sure you want to cancel?");
//       if (confirmCancel) {
//         await MealBookingService.cancelBooking(currentUserId, bookingId);
//         alert("Meal cancelled successfully!");
//         fetchBookingHistory(currentUserId);
//       }
//     } catch (error) {
//       console.error("Error cancelling meal:", error);
//       alert("Failed to cancel meal. Please try again.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Meal Booking Dashboard</h2>

//       <div className="booking-form">
//         <h3>Book a Meal</h3>
//         <form onSubmit={handleBookMeal}>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="menuId">Menu ID:</label>
//             <input
//               type="number"
//               id="menuId"
//               value={menuId}
//               onChange={(e) => setMenuId(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="mealCount">Meal Count:</label>
//             <input
//               type="number"
//               id="mealCount"
//               min="1"
//               value={mealCount}
//               onChange={(e) => setMealCount(parseInt(e.target.value))}
//               required
//             />
//           </div>
//           <button type="submit">Book Meal</button>
//         </form>
//       </div>

//       <div className="booking-history">
//         <h3>Booking History</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>User ID</th>
//               <th>User Name</th>
//               <th>Menu ID</th>
//               <th>Date</th>
//               <th>Meal Count</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookingHistory.map((booking) => (
//               <tr key={booking.bookId}>
//                 <td>{booking.bookId}</td>
//                 <td>{booking.user.id}</td>
//                 <td>{booking.user.name}</td>
//                 <td>{booking.menuId}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.mealCount}</td>
//                 <td>{booking.cancelled ? "Cancelled" : "Active"}</td>
//                 <td>
//                   {!booking.cancelled && (
//                     <button onClick={() => handleCancelMeal(booking.bookId)}>
//                       Cancel
//                     </button>
//                   )}
//                 </td>
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

export default function Dashboard() {
  const [date, setDate] = useState("");
  // const [menuId, setMenuId] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [emergencyMenuId, setEmergencyMenuId] = useState("");
  const [emergencyMealCount, setEmergencyMealCount] = useState(1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
          // setIsAdmin(UserService.isAdmin());
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

  const handleBookMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookingDate = new Date(date);
    const bookingDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      15,
      59
    );

    if (bookingDate < now.setHours(0, 0, 0, 0)) {
      alert("Cannot book for past days.");
      return;
    }

    if (now > bookingDeadline) {
      alert("Booking is only allowed until 11:15 AM.");
      return;
    }

    try {
      await MealBookingService.bookMeal(currentUserId, {
        date,
        // menuId,
        mealCount,
      });
      alert("Meal booked successfully!");
      fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking meal:", error);
      alert("Failed to book meal. Please try again.");
    }
  };

  const handleCancelMeal = async (bookingId) => {
    const now = new Date();
    const cancellationDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      0,
      0
    );

    if (now > cancellationDeadline) {
      alert("Meal cancellation is only allowed until 11:00 AM.");
      return;
    }

    try {
      // Prompt for confirmation before cancelling
      const confirmCancel = window.confirm("Are you sure you want to cancel?");
      if (confirmCancel) {
        await MealBookingService.cancelBooking(currentUserId, bookingId);
        alert("Meal cancelled successfully!");
        fetchBookingHistory(currentUserId);
      }
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  const handleEmergencyBooking = async (e) => {
    e.preventDefault();
    try {
      await MealBookingService.bookEmergencyMeal(currentUserId, {
        menuId: emergencyMenuId,
        mealCount: emergencyMealCount,
      });
      alert("Emergency meal booked successfully!");
      fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking emergency meal:", error);
      alert("Failed to book emergency meal. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="booking-form">
        <h3>Book a Meal</h3>
        <form onSubmit={handleBookMeal}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mealCount">Meal Count:</label>
            <input
              type="number"
              id="mealCount"
              min="1"
              value={mealCount}
              onChange={(e) => setMealCount(parseInt(e.target.value))}
              required
            />
          </div>
          <button type="submit">Book Meal</button>
        </form>
      </div>

      {UserService.isAdmin() && (
        <div className="emergency-booking-form">
          <h3>Emergency Meal Booking (Admin Only)</h3>
          <form onSubmit={handleEmergencyBooking}>
            <div className="form-group">
              <label htmlFor="emergencyMenuId">Menu ID:</label>
              <input
                type="number"
                id="emergencyMenuId"
                value={emergencyMenuId}
                onChange={(e) => setEmergencyMenuId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyMealCount">Meal Count:</label>
              <input
                type="number"
                id="emergencyMealCount"
                min="1"
                value={emergencyMealCount}
                onChange={(e) =>
                  setEmergencyMealCount(parseInt(e.target.value))
                }
                required
              />
            </div>
            <button type="submit">Book Emergency Meal</button>
          </form>
        </div>
      )}

      <div className="booking-history">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Meal Count</th>
              <th>Status</th>
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
                <td>{booking.cancelled ? "Cancelled" : "Active"}</td>
                <td>
                  {!booking.cancelled && (
                    <button onClick={() => handleCancelMeal(booking.bookId)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
