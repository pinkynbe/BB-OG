// import React, { useState, useEffect } from "react";
// import MealBookingService from "../service/MealBookingService";
// import UserService from "../service/UserService";

// export default function BulkBooking() {
//   const [event, setEvent] = useState("");
//   const [date, setDate] = useState("");
//   const [mealCount, setMealCount] = useState(1);
//   const [refNo, setRefNo] = useState("");
//   const [remark, setRemark] = useState("");
//   const [message, setMessage] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         if (UserService.isAuthenticated()) {
//           const token = localStorage.getItem("token");
//           const userProfile = await UserService.getYourProfile(token);
//           setCurrentUserId(userProfile.user.id);
//           // fetchBookingHistory(userProfile.user.id);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Handle form submission logic here
//   //   console.log({ purpose, date, mealCount, referenceNo, remark });
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const now = new Date();
//     const bookDate = new Date(date);

//     if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
//       alert("Cannot book for past days.");
//       return;
//     }

//     // const isToday = bookDate.toDateString() === now.toDateString();
//     // if (isToday && now.getHours() >= 11) {
//     //   alert("Booking is not allowed after 11:00 AM for today.");
//     //   return;
//     // }

//     try {
//       await MealBookingService.bookMeal(currentUserId, {
//         date,
//         mealCount,
//         event,
//         remark,
//         refNo,
//       });
//       setMessage("Booking successful!");
//       setDate("");
//       setMealCount(1);
//       alert("Meal booked successfully!");
//       // fetchBookingHistory(currentUserId);
//     } catch (error) {
//       console.error("Error booking meal:", error);
//       setMessage("Error creating booking. Please try again.");
//       alert("Failed to book meal. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h2 className="text-center mb-0">Bulk Booking</h2>
//             </div>
//             <div className="card-body">
//               {message && <div className="alert alert-info">{message}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="event" className="form-label">
//                     Purpose of Booking
//                   </label>
//                   <select
//                     id="event"
//                     className="form-select"
//                     value={event}
//                     onChange={(e) => setEvent(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Event</option>
//                     <option value="Meeting">Meeting</option>
//                     <option value="Conference">Conference</option>
//                     <option value="Training">Training</option>
//                     <option value="Event">Special Event</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="date" className="form-label">
//                     Booking Date
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="mealCount" className="form-label">
//                     Number of Meals
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="mealCount"
//                     min="1"
//                     value={mealCount}
//                     onChange={(e) => setMealCount(parseInt(e.target.value))}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="refNo" className="form-label">
//                     Reference Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="refNo"
//                     value={refNo}
//                     onChange={(e) => setRefNo(e.target.value)}
//                     placeholder="Enter reference number"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="remark" className="form-label">
//                     Remark
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="remark"
//                     rows="3"
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                     placeholder="Enter any additional remarks"
//                   ></textarea>
//                 </div>

//                 <button type="submit" className="btn btn-primary w-100">
//                   Book
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";
import {
  CalendarIcon,
  UserGroupIcon,
  HashtagIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";

export default function BulkBooking() {
  const [formData, setFormData] = useState({
    event: "",
    date: "",
    mealCount: 1,
    refNo: "",
    remark: "",
  });
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mealCount" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookDate = new Date(formData.date);

    if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      setMessage("Cannot book for past days.");
      return;
    }

    try {
      await MealBookingService.bookMeal(currentUserId, formData);
      setMessage("Booking successful!");
      setFormData({
        event: "",
        date: "",
        mealCount: 1,
        refNo: "",
        remark: "",
      });
    } catch (error) {
      console.error("Error booking meal:", error);
      setMessage("Error creating booking. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Bulk Booking
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          {message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="event"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose of Booking
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserGroupIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <select
                  id="event"
                  name="event"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.event}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Event</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Conference">Conference</option>
                  <option value="Training">Training</option>
                  <option value="Event">Special Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Booking Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mealCount"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Meals
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HashtagIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="number"
                  name="mealCount"
                  id="mealCount"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  min="1"
                  value={formData.mealCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="refNo"
                className="block text-sm font-medium text-gray-700"
              >
                Reference Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DocumentTextIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="refNo"
                  id="refNo"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.refNo}
                  onChange={handleInputChange}
                  placeholder="Enter reference number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="remark"
                className="block text-sm font-medium text-gray-700"
              >
                Remark
              </label>
              <div className="mt-1">
                <textarea
                  id="remark"
                  name="remark"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={formData.remark}
                  onChange={handleInputChange}
                  placeholder="Enter any additional remarks"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
