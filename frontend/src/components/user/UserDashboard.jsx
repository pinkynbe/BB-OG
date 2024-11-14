// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function UserDashboard() {
//   const [date, setDate] = useState("");
//   const [mealCount, setMealCount] = useState(1);
//   const [message, setMessage] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [bookingType, setBookingType] = useState("single"); // New state for booking type

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

//   const getNextMonday = () => {
//     const today = new Date();
//     const nextMonday = new Date(today);
//     nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
//     return nextMonday.toISOString().split("T")[0];
//   };

//   useEffect(() => {
//     if (bookingType === "week") {
//       setDate(getNextMonday());
//     } else {
//       setDate("");
//     }
//   }, [bookingType]);

//   const handleBookMeal = async (e) => {
//     e.preventDefault();
//     const now = new Date();
//     const bookDate = new Date(date);

//     if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
//       alert("Cannot book for past days.");
//       return;
//     }

//     const isToday = bookDate.toDateString() === now.toDateString();
//     if (isToday && now.getHours() >= 11) {
//       alert("Booking is not allowed after 11:00 AM for today.");
//       return;
//     }

//     try {
//       if (bookingType === "single") {
//         await MealBookingService.bookMeal(currentUserId, {
//           date,
//           mealCount,
//         });
//       } else {
//         // Book for the entire week
//         const weekDates = [];
//         for (let i = 0; i < 5; i++) {
//           const currentDate = new Date(bookDate);
//           currentDate.setDate(bookDate.getDate() + i);
//           weekDates.push(currentDate.toISOString().split("T")[0]);
//         }
//         for (const weekDate of weekDates) {
//           await MealBookingService.bookMeal(currentUserId, {
//             date: weekDate,
//             mealCount,
//           });
//         }
//       }
//       setMessage("Booking successful!");
//       setDate("");
//       setMealCount(1);
//       alert(
//         bookingType === "single"
//           ? "Meal booked successfully!"
//           : "Meals booked for the entire week successfully!"
//       );
//       fetchBookingHistory(currentUserId);
//     } catch (error) {
//       console.error("Error booking meal:", error);
//       setMessage("Error creating booking. Please try again.");
//       alert("Failed to book meal. Please try again.");
//     }
//   };

//   //Booking History
//   const fetchBookingHistory = async (userId) => {
//     try {
//       let response;
//       if (UserService.isAdmin()) {
//         response = await MealBookingService.getAllBookings(userId);
//       } else {
//         response = await MealBookingService.getUserBookingsForDate(userId, "");
//       }

//       //added
//       const allBookings = response.bookingList || [];
//       const currentAndFutureBookings = allBookings.filter((booking) => {
//         const bookingDate = new Date(booking.date);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return bookingDate >= today;
//       });

//       //added
//       const sortedBookings = sortBookings(currentAndFutureBookings, sortOrder);
//       setBookingHistory(sortedBookings);
//     } catch (error) {
//       console.error("Error fetching booking history:", error);
//     }
//   };

//   //added for sorting
//   const handleSort = () => {
//     const newOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newOrder);
//     setBookingHistory(sortBookings([...bookingHistory], newOrder));
//   };

//   //added for sorting
//   const sortBookings = (bookings, order) => {
//     return bookings.sort((a, b) => {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return order === "asc" ? dateA - dateB : dateB - dateA;
//     });
//   };

//   //Booking Cancellation

//   const handleCancelMeal = async (bookingId, bookingDate) => {
//     // const now = new Date();
//     // const today = new Date();
//     // const bookingDateObj = new Date(bookingDate);

//     // if (bookingDateObj < today.setHours(0, 0, 0, 0)) {
//     //   alert("Cannot cancel past bookings.");
//     //   return;
//     // }

//     // if (bookingDateObj.toDateString() === now.toDateString()) {
//     //   const cancellationDeadline = new Date(
//     //     now.getFullYear(),
//     //     now.getMonth(),
//     //     now.getDate(),
//     //     11,
//     //     0,
//     //     0
//     //   );

//     //   if (now > cancellationDeadline) {
//     //     alert(
//     //       "Meal cancellation is only allowed until 11:00 AM for today's bookings."
//     //     );
//     //     return;
//     //   }
//     // }

//     try {
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

//   const isCancellable = (bookingDate) => {
//     // const now = new Date();
//     // const bookingDateObj = new Date(bookingDate);

//     // if (bookingDateObj < now.setHours(0, 0, 0, 0)) {
//     //   return false;
//     // }

//     // if (bookingDateObj.toDateString() === now.toDateString()) {
//     //   const cancellationDeadline = new Date(
//     //     now.getFullYear(),
//     //     now.getMonth(),
//     //     now.getDate(),
//     //     11,
//     //     0,
//     //     0
//     //   );

//     const now = new Date();
//     const today = new Date();
//     const bookingDateObj = new Date(bookingDate);

//     if (bookingDateObj < today.setHours(0, 0, 0, 0)) {
//       return false;
//     }

//     if (bookingDateObj.toDateString() === now.toDateString()) {
//       const cancellationDeadline = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate(),
//         11,
//         0,
//         0
//       );

//       if (now > cancellationDeadline) {
//         return false;
//       }

//       return now <= cancellationDeadline;
//     }

//     return true;
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h2 className="text-center">Book a Meal</h2>
//             </div>
//             <div className="card-body">
//               {message && <div className="alert alert-info">{message}</div>}
//               <form onSubmit={handleBookMeal}>
//                 <div className="mb-3">
//                   <label className="form-label">Booking Type</label>
//                   <div>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="singleDay"
//                         value="single"
//                         checked={bookingType === "single"}
//                         onChange={(e) => setBookingType(e.target.value)}
//                       />
//                       <label className="form-check-label" htmlFor="singleDay">
//                         Single day
//                       </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="entireWeek"
//                         value="week"
//                         checked={bookingType === "week"}
//                         onChange={(e) => setBookingType(e.target.value)}
//                       />
//                       <label className="form-check-label" htmlFor="entireWeek">
//                         Entire week (Mon-Fri)
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="date" className="form-label">
//                     {bookingType === "single"
//                       ? "Booking Date"
//                       : "Starting Date (Next Monday)"}
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     required
//                     disabled={bookingType === "week"}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="mealCount" className="form-label">
//                     Number of Meals {bookingType === "week" ? "(per day)" : ""}
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="mealCount"
//                     min="1"
//                     max="10"
//                     value={mealCount}
//                     onChange={(e) => setMealCount(parseInt(e.target.value))}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                   Book Meal{bookingType === "week" ? "s" : ""}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Current Booking Table */}
//       <div className="currentBooking">
//         <h2 className="text-center mb-4">Current Bookings</h2>
//         <div className="table-responsive">
//           <table className="table table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>Booking ID</th>
//                 <th className="cursor-pointer" onClick={handleSort}>
//                   Date
//                   <span className="ml-2">
//                     {sortOrder === "asc" ? "↑" : "↓"}
//                   </span>
//                 </th>
//                 <th>Number of Meals</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookingHistory.map((booking) => (
//                 <tr key={booking.bookId}>
//                   <td>{booking.bookId}</td>
//                   <td>{booking.date}</td>
//                   <td>{booking.mealCount}</td>
//                   <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
//                   <td>
//                     {!booking.cancelled && isCancellable(booking.date) && (
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() =>
//                           handleCancelMeal(booking.bookId, booking.date)
//                         }
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MenuIcon,
} from "@heroicons/react/solid";

export default function UserDashboard() {
  const [date, setDate] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [bookingType, setBookingType] = useState("single");
  const [menuUrl, setMenuUrl] = useState(null);

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

    const fetchMenuUrl = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/menu/latest");
        if (response.ok) {
          const blob = await response.blob();
          const menuUrl = URL.createObjectURL(blob);
          setMenuUrl(menuUrl);
          console.log("Menu PDF URL successfully created:", menuUrl);
        } else {
          console.error("Failed to fetch menu PDF. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching menu URL:", error);
      }
    };

    fetchMenuUrl();
    fetchUserInfo();
  }, []);

  const getNextMonday = () => {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    return nextMonday.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (bookingType === "week") {
      setDate(getNextMonday());
    } else {
      setDate("");
    }
  }, [bookingType]);

  const handleBookMeal = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookDate = new Date(date);

    if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      alert("Cannot book for past days.");
      return;
    }

    const isToday = bookDate.toDateString() === now.toDateString();
    if (isToday && now.getHours() >= 11) {
      alert("Booking is not allowed after 11:00 AM for today.");
      return;
    }

    try {
      if (bookingType === "single") {
        await MealBookingService.bookMeal(currentUserId, {
          date,
          mealCount,
        });
      } else {
        // Book for the entire week
        const weekDates = [];
        for (let i = 0; i < 5; i++) {
          const currentDate = new Date(bookDate);
          currentDate.setDate(bookDate.getDate() + i);
          weekDates.push(currentDate.toISOString().split("T")[0]);
        }
        for (const weekDate of weekDates) {
          await MealBookingService.bookMeal(currentUserId, {
            date: weekDate,
            mealCount,
          });
        }
      }
      setMessage("Booking successful!");
      setDate("");
      setMealCount(1);
      alert(
        bookingType === "single"
          ? "Meal booked successfully!"
          : "Meals booked for the entire week successfully!"
      );
      fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking meal:", error);
      setMessage("Error creating booking. Please try again.");
      alert("Failed to book meal. Please try again.");
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

      //added
      const allBookings = response.bookingList || [];
      const currentAndFutureBookings = allBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return bookingDate >= today;
      });

      //added
      const sortedBookings = sortBookings(currentAndFutureBookings, sortOrder);
      setBookingHistory(sortedBookings);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setBookingHistory(sortBookings([...bookingHistory], newOrder));
  };

  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleCancelMeal = async (bookingId, bookingDate) => {
    try {
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

  const isCancellable = (bookingDate) => {
    const now = new Date();
    const today = new Date();
    const bookingDateObj = new Date(bookingDate);

    if (bookingDateObj < today.setHours(0, 0, 0, 0)) {
      return false;
    }

    if (bookingDateObj.toDateString() === now.toDateString()) {
      const cancellationDeadline = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        11,
        0,
        0
      );

      if (now > cancellationDeadline) {
        return false;
      }

      return now <= cancellationDeadline;
    }

    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* <div className=" flex gap-2"> */}
        {/* <div className="w-4/6"> */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          {/* <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6 flex gap-2">
            <div className="w-1/2">
              <h2 className="text-lg leading-6 font-medium text-white">
                Book a Meal
              </h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {menuUrl ? (
                <a
                  href={menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <h2 className="text-lg leading-6 font-medium text-sm text-white flex items-center">
                    <MenuIcon className="h-5 w-5 mr-2" />
                    This Week's Menu
                  </h2>
                </a>
              ) : (
                <p className="text-gray-500">Menu not available</p>
              )}
            </div>
          </div> */}
          <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center justify-between gap-4">
            <div className="w-1/2">
              <h2 className="text-lg leading-6 font-medium text-white">
                Book a Meal
              </h2>
            </div>
            <div className="w-1/2 flex justify-end">
              {menuUrl ? (
                <a
                  href={menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MenuIcon className="h-5 w-5 mr-2" />
                  <span>This Week's Menu</span>
                </a>
              ) : (
                <p className="text-gray-300">Menu not available</p>
              )}
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {message && (
              <div
                className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{message}</span>
              </div>
            )}
            <form onSubmit={handleBookMeal}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Type
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="bookingType"
                      value="single"
                      checked={bookingType === "single"}
                      onChange={(e) => setBookingType(e.target.value)}
                    />
                    <span className="ml-2">Single day</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="bookingType"
                      value="week"
                      checked={bookingType === "week"}
                      onChange={(e) => setBookingType(e.target.value)}
                    />
                    <span className="ml-2">Entire week (Mon-Fri)</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {bookingType === "single"
                    ? "Booking Date"
                    : "Starting Date (Next Monday)"}
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  disabled={bookingType === "week"}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mealCount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Meals {bookingType === "week" ? "(per day)" : ""}
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="mealCount"
                  min="1"
                  max="10"
                  value={mealCount}
                  onChange={(e) => setMealCount(parseInt(e.target.value))}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Meal{bookingType === "week" ? "s" : ""}
              </button>
            </form>
          </div>
        </div>
        {/* </div> */}

        {/* Modified Menu section */}
        {/* <div className="w-2/6 bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-white flex items-center">
                <MenuIcon className="h-5 w-5 mr-2" />
                This Week's Menu
              </h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {menuUrl ? (
                <a
                  href={menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <h2 className="text-lg leading-6 font-medium text-sm text-white flex items-center">
                    <MenuIcon className="h-5 w-5 mr-2" />
                    This Week's Menu
                  </h2>
                </a>
              ) : (
                <p className="text-gray-500">Menu not available</p>
              )}
            </div>
          </div>
        </div> */}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-indigo-600 px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-white">
              Current Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Booking ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={handleSort}
                  >
                    Date
                    <span className="ml-2 inline-block">
                      {sortOrder === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Number of Meals
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingHistory.map((booking) => (
                  <tr key={booking.bookId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.mealCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.cancelled
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {booking.cancelled ? "Cancelled" : "Booked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!booking.cancelled && isCancellable(booking.date) && (
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() =>
                            handleCancelMeal(booking.bookId, booking.date)
                          }
                        >
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
      </div>
    </div>
  );
}
