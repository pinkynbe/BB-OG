// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import MealBookingService from "../service/MealBookingService";
// // import UserService from "../service/UserService";

// // export default function AdminDashboard() {
// //   const [todayBookings, setTodayBookings] = useState(0);
// //   const [todayCancellations, setTodayCancellations] = useState(0);
// //   const [currentUserId, setCurrentUserId] = useState(null);
// //   const [bookingHistory, setBookingHistory] = useState([]);
// //   const [sortOrder, setSortOrder] = useState("desc");

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         if (UserService.isAuthenticated()) {
// //           const token = localStorage.getItem("token");
// //           const userProfile = await UserService.getYourProfile(token);
// //           setCurrentUserId(userProfile.user.id);
// //           fetchTodayBooking(userProfile.user.id);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user info:", error);
// //       }
// //     };

// //     fetchDashboardData();
// //   }, []);

// //   const fetchTodayBooking = async (userId) => {
// //     try {
// //       const date = new Date();
// //       const today = `${date.getFullYear()}-${(date.getMonth() + 1)
// //         .toString()
// //         .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
// //       const response = await MealBookingService.getTodayBookings(userId, today);

// //       const confirmedMeals = response.bookingList.reduce(
// //         (sum, booking) => (!booking.cancelled ? sum + booking.mealCount : sum),
// //         0
// //       );
// //       const cancelledMeals = response.bookingList.reduce(
// //         (sum, booking) => (booking.cancelled ? sum + booking.mealCount : sum),
// //         0
// //       );

// //       setTodayBookings(confirmedMeals);
// //       setTodayCancellations(cancelledMeals);

// //       const activeBookings = response.bookingList.filter(
// //         (booking) => !booking.cancelled
// //       );
// //       const sortedBookings = sortBookings(activeBookings, sortOrder);
// //       setBookingHistory(sortedBookings);
// //     } catch (error) {
// //       console.error("Error fetching booking data:", error);
// //     }
// //   };

// //   const handleCancelMeal = async (bookingId, bookingDate) => {
// //     try {
// //       const confirmCancel = window.confirm("Are you sure you want to cancel?");
// //       if (confirmCancel) {
// //         await MealBookingService.cancelBooking(currentUserId, bookingId);
// //         alert("Meal cancelled successfully!");
// //         fetchTodayBooking(currentUserId);
// //       }
// //     } catch (error) {
// //       console.error("Error cancelling meal:", error);
// //       alert("Failed to cancel meal. Please try again.");
// //     }
// //   };

// //   const handleSort = () => {
// //     const newOrder = sortOrder === "asc" ? "desc" : "asc";
// //     setSortOrder(newOrder);
// //     setBookingHistory(sortBookings([...bookingHistory], newOrder));
// //   };

// //   const sortBookings = (bookings, order) => {
// //     return bookings.sort((a, b) => {
// //       const nameA = a.user.name.toLowerCase();
// //       const nameB = b.user.name.toLowerCase();
// //       if (nameA < nameB) return order === "asc" ? -1 : 1;
// //       if (nameA > nameB) return order === "asc" ? 1 : -1;
// //       return 0;
// //     });
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center mb-4">Admin Dashboard</h2>
// //       <div className="row">
// //         <div className="col-md-6">
// //           <div className="card mb-4">
// //             <div className="card-body">
// //               <h5 className="card-title">Today's Confirmed Meals</h5>
// //               <p className="card-text display-4">{todayBookings}</p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-md-6">
// //           <div className="card mb-4">
// //             <div className="card-body">
// //               <h5 className="card-title">Today's Cancelled Meals</h5>
// //               <p className="card-text display-4">{todayCancellations}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="row">
// //         <div className="col-md-12">
// //           <div className="card mb-4">
// //             <div className="card-body">
// //               <h5 className="card-title">Quick Actions</h5>
// //               <div className="d-grid gap-2 d-md-flex justify-content-md-start">
// //                 <Link
// //                   to="/admin/bulk-booking"
// //                   className="btn btn-primary me-md-2"
// //                 >
// //                   Bulk Booking
// //                 </Link>
// //                 <Link
// //                   to="/admin/tatkal-booking"
// //                   className="btn btn-danger me-md-2"
// //                 >
// //                   Emergency Booking
// //                 </Link>
// //                 <Link to="/admin/mis" className="btn btn-info">
// //                   Generate MIS Report
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="row">
// //         <div className="col-md-12">
// //           <div className="card">
// //             <div className="card-body">
// //               <h5 className="card-title">Today's Active Bookings</h5>
// //               <div className="table-responsive">
// //                 <table className="table table-striped table-hover">
// //                   <thead className="table-dark">
// //                     <tr>
// //                       <th>Booking ID</th>
// //                       <th>Date</th>
// //                       <th className="cursor-pointer" onClick={handleSort}>
// //                         Name{" "}
// //                         <span className="ml-2">
// //                           {sortOrder === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       </th>
// //                       <th>Number of Meals</th>
// //                       <th>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {bookingHistory.map((booking) => (
// //                       <tr key={booking.bookId}>
// //                         <td>{booking.bookId}</td>
// //                         <td>{booking.date}</td>
// //                         <td>{booking.user.name}</td>
// //                         <td>{booking.mealCount}</td>
// //                         <td>
// //                           <button
// //                             className="btn btn-sm btn-danger"
// //                             onClick={() =>
// //                               handleCancelMeal(booking.bookId, booking.date)
// //                             }
// //                           >
// //                             Cancel
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";
// import {
//   ChevronUpIcon,
//   ChevronDownIcon,
//   ClipboardListIcon,
//   ExclamationIcon,
//   DocumentReportIcon,
// } from "@heroicons/react/solid";

// export default function AdminDashboard() {
//   const [todayBookings, setTodayBookings] = useState(0);
//   const [todayCancellations, setTodayCancellations] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         if (UserService.isAuthenticated()) {
//           const token = localStorage.getItem("token");
//           const userProfile = await UserService.getYourProfile(token);
//           setCurrentUserId(userProfile.user.id);
//           fetchTodayBooking(userProfile.user.id);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const fetchTodayBooking = async (userId) => {
//     try {
//       const date = new Date();
//       const today = `${date.getFullYear()}-${(date.getMonth() + 1)
//         .toString()
//         .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
//       const response = await MealBookingService.getTodayBookings(userId, today);

//       const confirmedMeals = response.bookingList.reduce(
//         (sum, booking) => (!booking.cancelled ? sum + booking.mealCount : sum),
//         0
//       );
//       const cancelledMeals = response.bookingList.reduce(
//         (sum, booking) => (booking.cancelled ? sum + booking.mealCount : sum),
//         0
//       );

//       setTodayBookings(confirmedMeals);
//       setTodayCancellations(cancelledMeals);

//       const activeBookings = response.bookingList.filter(
//         (booking) => !booking.cancelled
//       );
//       const sortedBookings = sortBookings(activeBookings, sortOrder);
//       setBookingHistory(sortedBookings);
//     } catch (error) {
//       console.error("Error fetching booking data:", error);
//     }
//   };

//   const handleCancelMeal = async (bookingId, bookingDate) => {
//     try {
//       const confirmCancel = window.confirm("Are you sure you want to cancel?");
//       if (confirmCancel) {
//         await MealBookingService.cancelBooking(currentUserId, bookingId);
//         alert("Meal cancelled successfully!");
//         fetchTodayBooking(currentUserId);
//       }
//     } catch (error) {
//       console.error("Error cancelling meal:", error);
//       alert("Failed to cancel meal. Please try again.");
//     }
//   };

//   const handleSort = () => {
//     const newOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newOrder);
//     setBookingHistory(sortBookings([...bookingHistory], newOrder));
//   };

//   const sortBookings = (bookings, order) => {
//     return bookings.sort((a, b) => {
//       const nameA = a.user.name.toLowerCase();
//       const nameB = b.user.name.toLowerCase();
//       if (nameA < nameB) return order === "asc" ? -1 : 1;
//       if (nameA > nameB) return order === "asc" ? 1 : -1;
//       return 0;
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <ClipboardListIcon
//                   className="h-6 w-6 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Today's Confirmed Meals
//                   </dt>
//                   <dd className="flex items-baseline">
//                     <div className="text-2xl font-semibold text-gray-900">
//                       {todayBookings}
//                     </div>
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <ExclamationIcon
//                   className="h-6 w-6 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Today's Cancelled Meals
//                   </dt>
//                   <dd className="flex items-baseline">
//                     <div className="text-2xl font-semibold text-gray-900">
//                       {todayCancellations}
//                     </div>
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="bg-white shadow rounded-lg">
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               Quick Actions
//             </h3>
//             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Link
//                 to="/admin/bulk-booking"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Bulk Booking
//               </Link>
//               <Link
//                 to="/admin/tatkal-booking"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//               >
//                 Emergency Booking
//               </Link>
//               <Link
//                 to="/admin/mis"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
//               >
//                 <DocumentReportIcon
//                   className="-ml-1 mr-2 h-5 w-5"
//                   aria-hidden="true"
//                 />
//                 Generate MIS Report
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="bg-white shadow rounded-lg">
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//               Today's Active Bookings
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Booking ID
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Date
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={handleSort}
//                     >
//                       Name
//                       <span className="ml-2 inline-block">
//                         {sortOrder === "asc" ? (
//                           <ChevronUpIcon className="h-4 w-4" />
//                         ) : (
//                           <ChevronDownIcon className="h-4 w-4" />
//                         )}
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Number of Meals
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {bookingHistory.map((booking) => (
//                     <tr key={booking.bookId}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {booking.bookId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {booking.date}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {booking.user.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {booking.mealCount}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() =>
//                             handleCancelMeal(booking.bookId, booking.date)
//                           }
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           Cancel
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ClipboardListIcon,
  ExclamationIcon,
  DocumentReportIcon,
} from "@heroicons/react/solid";

export default function AdminDashboard() {
  const [todayBookings, setTodayBookings] = useState(0);
  const [todayCancellations, setTodayCancellations] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
          fetchTodayBooking(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchTodayBooking = async (userId) => {
    try {
      const date = new Date();
      const today = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      const response = await MealBookingService.getTodayBookings(userId, today);

      const userBookings = response.bookingList.filter(
        (booking) => booking.user.role !== "ADMIN"
      );
      const adminBookings = response.bookingList.filter(
        (booking) => booking.user.role === "ADMIN"
      );

      const confirmedMeals = userBookings.reduce(
        (sum, booking) => (!booking.cancelled ? sum + booking.mealCount : sum),
        0
      );
      const cancelledMeals = userBookings.reduce(
        (sum, booking) => (booking.cancelled ? sum + booking.mealCount : sum),
        0
      );

      setTodayBookings(confirmedMeals);
      setTodayCancellations(cancelledMeals);

      const activeUserBookings = userBookings.filter(
        (booking) => !booking.cancelled
      );
      const sortedUserBookings = sortBookings(activeUserBookings, sortOrder);
      setBookingHistory(sortedUserBookings);

      setAdminBookings(adminBookings);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const handleCancelMeal = async (bookingId, bookingDate) => {
    try {
      const confirmCancel = window.confirm("Are you sure you want to cancel?");
      if (confirmCancel) {
        await MealBookingService.cancelBooking(currentUserId, bookingId);
        alert("Meal cancelled successfully!");
        fetchTodayBooking(currentUserId);
      }
    } catch (error) {
      console.error("Error cancelling meal:", error);
      alert("Failed to cancel meal. Please try again.");
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setBookingHistory(sortBookings([...bookingHistory], newOrder));
  };

  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const nameA = a.user.name.toLowerCase();
      const nameB = b.user.name.toLowerCase();
      if (nameA < nameB) return order === "asc" ? -1 : 1;
      if (nameA > nameB) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardListIcon
                  className="h-6 w-6 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Today's Confirmed Meals
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {todayBookings}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationIcon
                  className="h-6 w-6 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Today's Cancelled Meals
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {todayCancellations}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link
                to="/admin/bulk-booking"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Bulk Booking
              </Link>
              <Link
                to="/admin/tatkal-booking"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Emergency Booking
              </Link>
              <Link
                to="/admin/mis"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                <DocumentReportIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Generate MIS Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Today's Active Bookings
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Booking ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={handleSort}
                    >
                      Name
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Number of Meals
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bookingHistory.map((booking) => (
                    <tr key={booking.bookId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {booking.bookId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {booking.user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {booking.mealCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            handleCancelMeal(booking.bookId, booking.date)
                          }
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {adminBookings.length > 0 && (
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Admin Bookings
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Booking ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Admin Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Number of Meals
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Remark
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {adminBookings.map((booking) => (
                      <tr key={booking.bookId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {booking.bookId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {booking.user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {booking.mealCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {booking.event || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {booking.remark || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.cancelled
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {booking.cancelled ? "Cancelled" : "Booked"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
