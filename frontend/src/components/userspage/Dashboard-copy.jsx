import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";

export default function Dashboard() {
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [menu, setMenu] = useState("");
  const [count, setCount] = useState(1);
  const [remark, setRemark] = useState("");
  const [bookingHistory, setBookingHistory] = useState([]);
  const [emergencyUserId, setEmergencyUserId] = useState("");
  const [emergencyCount, setEmergencyCount] = useState(1);
  const [cancelBookingId, setCancelBookingId] = useState("");

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const history = await MealBookingService.getBookingHistory();
      setBookingHistory(history);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleBookMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookingDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      11,
      15,
      59
    );

    if (now > bookingDeadline) {
      alert("Booking is only allowed until 11:15 AM.");
      return;
    }

    try {
      await MealBookingService.bookMeal({ userId, date, menu, count, remark });
      alert("Meal booked successfully!");
      fetchBookingHistory();
    } catch (error) {
      console.error("Error booking meal:", error);
      alert("Failed to book meal. Please try again.");
    }
  };

  const handleEmergencyBooking = async (e) => {
    e.preventDefault();
    try {
      await MealBookingService.emergencyBooking({
        userId: emergencyUserId,
        count: emergencyCount,
      });
      alert("Emergency meal booked successfully!");
      fetchBookingHistory();
    } catch (error) {
      console.error("Error booking emergency meal:", error);
      alert("Failed to book emergency meal. Please try again.");
    }
  };

  const handleCancelMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const cancellationDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      11,
      0,
      0
    );

    if (now > cancellationDeadline) {
      alert("Meal cancellation is only allowed until 11:00 AM.");
      return;
    }

    try {
      await MealBookingService.cancelMeal(cancelBookingId);
      alert("Meal cancelled successfully!");
      fetchBookingHistory();
      setCancelBookingId("");
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Meal Booking Dashboard</h2>

      <div className="booking-form">
        <h3>Book a Meal</h3>
        <form onSubmit={handleBookMeal}>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="menu">Menu:</label>
            <select
              id="menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              required
            >
              <option value="">Select a menu</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="count">Count:</label>
            <input
              type="number"
              id="count"
              min="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="remark">Remark:</label>
            <textarea
              id="remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Book Meal</button>
        </form>
      </div>

      <div className="emergency-booking">
        <h3>Emergency Booking</h3>
        <form onSubmit={handleEmergencyBooking}>
          <div className="form-group">
            <label htmlFor="emergencyUserId">User ID:</label>
            <input
              type="text"
              id="emergencyUserId"
              value={emergencyUserId}
              onChange={(e) => setEmergencyUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyCount">Number of Meals:</label>
            <input
              type="number"
              id="emergencyCount"
              min="1"
              value={emergencyCount}
              onChange={(e) => setEmergencyCount(parseInt(e.target.value))}
              required
            />
          </div>
          <button type="submit">Book Emergency Meal</button>
        </form>
      </div>

      <div className="cancel-booking">
        <h3>Cancel Meal (Before 11:00 AM)</h3>
        <form onSubmit={handleCancelMeal}>
          <div className="form-group">
            <label htmlFor="cancelBookingId">Booking ID:</label>
            <input
              type="text"
              id="cancelBookingId"
              value={cancelBookingId}
              onChange={(e) => setCancelBookingId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cancel Meal</button>
        </form>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Menu</th>
              <th>Count</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking, index) => (
              <tr key={index}>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.date}</td>
                <td>{booking.menu}</td>
                <td>{booking.count}</td>
                <td>{booking.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function Dashboard() {
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [menuId, setMenuId] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [cancelBookingId, setCancelBookingId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const isAdminUser = UserService.isAdmin();
      setIsAdmin(isAdminUser);

      const userProfile = await UserService.getYourProfile(
        localStorage.getItem("token")
      );
      setCurrentUserId(userProfile.user.id);
    };

    checkUserRole();
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      let response;
      if (isAdmin) {
        response = await MealBookingService.getAllBookings();
      } else {
        response = await MealBookingService.getUserBookingsForDate(
          currentUserId,
          new Date().toISOString().split("T")[0]
        );
      }
      setBookingHistory(response.bookingList || []);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleBookMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookingDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      15,
      59
    );

    if (now > bookingDeadline) {
      alert("Booking is only allowed until 11:15 AM.");
      return;
    }

    try {
      await MealBookingService.bookMeal({
        userId: currentUserId,
        date,
        menuId,
        mealCount,
      });
      alert("Meal booked successfully!");
      fetchBookingHistory();
    } catch (error) {
      console.error("Error booking meal:", error);
      alert("Failed to book meal. Please try again.");
    }
  };

  const handleCancelMeal = async (e) => {
    e.preventDefault();
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
      await MealBookingService.cancelBooking(cancelBookingId);
      alert("Meal cancelled successfully!");
      await fetchBookingHistory();
      setCancelBookingId("");
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Meal Booking Dashboard</h2>

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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="menuId">Menu ID:</label>
            <input
              type="number"
              id="menuId"
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
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

      <div className="cancel-booking">
        <h3>Cancel Meal (Before 11:00 AM)</h3>
        <form onSubmit={handleCancelMeal}>
          <div className="form-group">
            <label htmlFor="cancelBookingId">Booking ID:</label>
            <input
              type="text"
              id="cancelBookingId"
              value={cancelBookingId}
              onChange={(e) => setCancelBookingId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cancel Meal</button>
        </form>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Menu ID</th>
              <th>Date</th>
              <th>Meal Count</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.menuId}</td>
                <td>{booking.date}</td>
                <td>{booking.mealCount}</td>
                <td>{booking.cancelled ? "Cancelled" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


//////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function Dashboard() {
//   const [date, setDate] = useState("");
//   const [menuId, setMenuId] = useState("");
//   const [mealCount, setMealCount] = useState(1);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [cancelBookingId, setCancelBookingId] = useState("");
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
//         const today = new Date().toISOString().split("T")[0];
//         response = await MealBookingService.getUserBookingsForDate(
//           userId,
//           today
//         );
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
//       11,
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

//   const handleCancelMeal = async (e) => {
//     e.preventDefault();
//     const now = new Date();
//     const cancellationDeadline = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       11,
//       0,
//       0
//     );

//     if (now > cancellationDeadline) {
//       alert("Meal cancellation is only allowed until 11:00 AM.");
//       return;
//     }

//     try {
//       await MealBookingService.cancelBooking(currentUserId, cancelBookingId);
//       alert("Meal cancelled successfully!");
//       fetchBookingHistory(currentUserId);
//       setCancelBookingId("");
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

//       <div className="cancel-booking">
//         <h3>Cancel Meal (Before 11:00 AM)</h3>
//         <form onSubmit={handleCancelMeal}>
//           <div className="form-group">
//             <label htmlFor="cancelBookingId">Booking ID:</label>
//             <input
//               type="text"
//               id="cancelBookingId"
//               value={cancelBookingId}
//               onChange={(e) => setCancelBookingId(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Cancel Meal</button>
//         </form>
//       </div>

//       <div className="booking-history">
//         <h3>Booking History</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>User ID</th>
//               <th>Menu ID</th>
//               <th>Date</th>
//               <th>Meal Count</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookingHistory.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.userId}</td>
//                 <td>{booking.menuId}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.mealCount}</td>
//                 <td>{booking.cancelled ? "Cancelled" : "Active"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [menuId, setMenuId] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [cancelBookingId, setCancelBookingId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  //added
  // const { userId } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
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
        const today = new Date().toISOString().split("T")[0];
        response = await MealBookingService.getUserBookingsForDate(
          userId,
          today
        );
      }
      setBookingHistory(response.bookingList || []);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleBookMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookingDeadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      15,
      59
    );

    if (now > bookingDeadline) {
      alert("Booking is only allowed until 11:15 AM.");
      return;
    }

    try {
      await MealBookingService.bookMeal(currentUserId, {
        date,
        menuId,
        mealCount,
      });
      alert("Meal booked successfully!");
      fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking meal:", error);
      alert("Failed to book meal. Please try again.");
    }
  };

  const handleCancelMeal = async (e) => {
    e.preventDefault();
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
      await MealBookingService.cancelBooking(currentUserId, cancelBookingId);
      alert("Meal cancelled successfully!");
      fetchBookingHistory(currentUserId);
      setCancelBookingId("");
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Meal Booking Dashboard</h2>

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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="menuId">Menu ID:</label>
            <input
              type="number"
              id="menuId"
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
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

      <div className="cancel-booking">
        <h3>Cancel Meal (Before 11:00 AM)</h3>
        <form onSubmit={handleCancelMeal}>
          <div className="form-group">
            <label htmlFor="cancelBookingId">Booking ID:</label>
            <input
              type="text"
              id="cancelBookingId"
              value={cancelBookingId}
              onChange={(e) => setCancelBookingId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cancel Meal</button>
        </form>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Menu ID</th>
              <th>Date</th>
              <th>Meal Count</th>
              <th>Status</th>
              {/* <th>Cancel</th> */}
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking) => (
              <tr key={booking.bookId}>
                <td>{booking.bookId}</td>
                <td>{booking.userId}</td>
                <td>{booking.menuId}</td>
                <td>{booking.date}</td>
                <td>{booking.mealCount}</td>
                <td>{booking.cancelled ? "Cancelled" : "Active"}</td>
                {/* <td>
                  <button onClick={handleCancelMeal} onChange={(e) => setCancelBookingId(bookId)}>Cancel</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
