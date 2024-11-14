// // import React, { useState, useEffect } from "react";
// // import UserService from "../service/UserService";
// // import MealBookingService from "../service/MealBookingService";
// // import { UserIcon, PlusCircleIcon } from "@heroicons/react/solid";

// // export default function TatkalBooking() {
// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState("");
// //   const [mealCount, setMealCount] = useState(1);
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await UserService.getAllUsers(token);
// //       setUsers(response.userList);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //       setMessage("Error fetching users. Please try again.");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!selectedUser) {
// //       setMessage("Please select a user.");
// //       return;
// //     }
// //     try {
// //       const bookingData = {
// //         date: new Date().toISOString().split("T")[0],
// //         mealCount: mealCount,
// //       };
// //       await MealBookingService.bookMeal(selectedUser, bookingData);
// //       setMessage("Emergency meal booked successfully!");
// //       setSelectedUser("");
// //       setMealCount(1);
// //     } catch (error) {
// //       console.error("Error booking emergency meal:", error);
// //       setMessage("Error booking emergency meal. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //           Emergency Booking
// //         </h2>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           {message && (
// //             <div
// //               className={`mb-4 p-4 rounded-md ${
// //                 message.includes("Error")
// //                   ? "bg-red-100 text-red-700"
// //                   : "bg-green-100 text-green-700"
// //               }`}
// //             >
// //               {message}
// //             </div>
// //           )}
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label
// //                 htmlFor="userSelect"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Select User
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <UserIcon
// //                     className="h-5 w-5 text-gray-400"
// //                     aria-hidden="true"
// //                   />
// //                 </div>
// //                 <select
// //                   id="userSelect"
// //                   className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
// //                   value={selectedUser}
// //                   onChange={(e) => setSelectedUser(e.target.value)}
// //                   required
// //                 >
// //                   <option value="">Select a user</option>
// //                   {users.map((user) => (
// //                     <option key={user.id} value={user.id}>
// //                       {user.name} - {user.pan}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="emergencyMealCount"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Number of Meals
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <PlusCircleIcon
// //                     className="h-5 w-5 text-gray-400"
// //                     aria-hidden="true"
// //                   />
// //                 </div>
// //                 <input
// //                   type="number"
// //                   id="emergencyMealCount"
// //                   className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
// //                   min="1"
// //                   value={mealCount}
// //                   onChange={(e) => setMealCount(parseInt(e.target.value))}
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// //               >
// //                 Book Emergency Meal
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import UserService from "../service/UserService";
// import MealBookingService from "../service/MealBookingService";
// import {
//   UserIcon,
//   PlusCircleIcon,
//   LockClosedIcon,
// } from "@heroicons/react/solid";

// export default function TatkalBooking() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [mealCount, setMealCount] = useState(1);
//   const [message, setMessage] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await UserService.getAllUsers(token);
//       setUsers(response.userList);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setMessage("Error fetching users. Please try again.");
//     }
//   };

//   const handleSendOtp = async () => {
//     if (!selectedUser) {
//       setMessage("Please select a user.");
//       return;
//     }
//     try {
//       const response = await UserService.sendBookingOtp(selectedUser);
//       setOtpSent(true);
//       setMessage(
//         response.message || "OTP sent successfully to user's mobile and email."
//       );
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Error sending OTP. Please try again.");
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!selectedUser || !otp) {
//   //     setMessage("Please select a user and enter the OTP.");
//   //     return;
//   //   }
//   //   try {
//   //     const user = users.find((u) => u.id.toString() === selectedUser);
//   //     if (!user) {
//   //       setMessage("Selected user not found.");
//   //       return;
//   //     }

//   //     // Verify OTP without assigning token
//   //     await UserService.verifyBookingOtp(user.mobileNo, otp);

//   //     // Book the emergency meal
//   //     const bookingData = {
//   //       date: new Date().toISOString().split("T")[0],
//   //       mealCount: mealCount,
//   //     };
//   //     await MealBookingService.bookMeal(selectedUser, bookingData);
//   //     setMessage("Emergency meal booked successfully!");
//   //     setSelectedUser("");
//   //     setMealCount(1);
//   //     setOtp("");
//   //     setOtpSent(false);
//   //   } catch (error) {
//   //     console.error("Error booking emergency meal:", error);
//   //     setMessage("Error booking emergency meal. Please try again.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedUser || !otp) {
//       setMessage("Please select a user and enter the OTP.");
//       return;
//     }

//     try {
//       const user = users.find((u) => u.id.toString() === selectedUser);
//       if (!user) {
//         setMessage("Selected user not found.");
//         return;
//       }

//       // Verify OTP and check the status
//       const otpVerificationResponse = await UserService.verifyBookingOtp(
//         user.mobileNo,
//         otp
//       );

//       if (otpVerificationResponse.status === 200) {
//         // OTP is valid, proceed with booking
//         const bookingData = {
//           date: new Date().toISOString().split("T")[0],
//           mealCount: mealCount,
//         };

//         await MealBookingService.bookMeal(selectedUser, bookingData);
//         setMessage("Emergency meal booked successfully!");

//         // Reset form fields
//         setSelectedUser("");
//         setMealCount(1);
//         setOtp("");
//         setOtpSent(false);
//       } else {
//         // If OTP is invalid, set error message
//         setMessage("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       // Handle OTP verification failure
//       console.error("Error verifying OTP or booking meal:", error);
//       setMessage("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Emergency Booking
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {message && (
//             <div
//               className={`mb-4 p-4 rounded-md ${
//                 message.includes("Error")
//                   ? "bg-red-100 text-red-700"
//                   : "bg-green-100 text-green-700"
//               }`}
//             >
//               {message}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="userSelect"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Select User
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UserIcon
//                     className="h-5 w-5 text-gray-400"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <select
//                   id="userSelect"
//                   className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
//                   value={selectedUser}
//                   onChange={(e) => setSelectedUser(e.target.value)}
//                   required
//                 >
//                   <option value="">Select a user</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name} - {user.pan}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="emergencyMealCount"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Number of Meals
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <PlusCircleIcon
//                     className="h-5 w-5 text-gray-400"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <input
//                   type="number"
//                   id="emergencyMealCount"
//                   className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//                   min="1"
//                   value={mealCount}
//                   onChange={(e) => setMealCount(parseInt(e.target.value))}
//                   required
//                 />
//               </div>
//             </div>

//             {!otpSent ? (
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Send OTP
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <label
//                   htmlFor="otp"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Enter OTP
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <LockClosedIcon
//                       className="h-5 w-5 text-gray-400"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     id="otp"
//                     className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             {otpSent && (
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Book Emergency Meal
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import MealBookingService from "../service/MealBookingService";
import {
  UserIcon,
  PlusCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

export default function TatkalBooking() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching users. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    if (!selectedUser) {
      setMessage("Please select a user.");
      return;
    }
    try {
      const response = await UserService.sendBookingOtp(selectedUser);
      setOtpSent(true);
      setMessage(
        response.message || "OTP sent successfully to user's mobile and email."
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !otp) {
      setMessage("Please select a user and enter the OTP.");
      return;
    }
    try {
      const user = users.find((u) => u.id.toString() === selectedUser);
      if (!user) {
        setMessage("Selected user not found.");
        return;
      }

      // Verify OTP without assigning token
      const verificationResponse = await UserService.verifyBookingOtp(
        user.mobileNo,
        otp
      );

      if (verificationResponse.statusCode !== 200) {
        setMessage(
          verificationResponse.message || "Invalid OTP. Please try again."
        );
        return;
      }

      // Book the emergency meal
      const bookingData = {
        date: new Date().toISOString().split("T")[0],
        mealCount: mealCount,
      };
      await MealBookingService.bookMeal(selectedUser, bookingData);
      setMessage("Emergency meal booked successfully!");
      setSelectedUser("");
      setMealCount(1);
      setOtp("");
      setOtpSent(false);
    } catch (error) {
      console.error("Error booking emergency meal:", error);
      setMessage("Error booking emergency meal. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Emergency Booking
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                message.includes("Error") || message.includes("Invalid")
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
                htmlFor="userSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select User
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <select
                  id="userSelect"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.pan}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="emergencyMealCount"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Meals
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PlusCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="number"
                  id="emergencyMealCount"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  min="1"
                  value={mealCount}
                  onChange={(e) => setMealCount(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            {!otpSent ? (
              <div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    id="otp"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {otpSent && (
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Book Emergency Meal
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
