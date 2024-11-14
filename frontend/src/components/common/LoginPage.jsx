// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { useAuth } from "../../AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { updateAuthStatus } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userData = await UserService.login(email, password);
//       console.log(userData);
//       if (userData.token) {
//         localStorage.setItem("token", userData.token);
//         localStorage.setItem("role", userData.role);
//         updateAuthStatus();
//         navigate("/dashboard");
//       } else {
//         setError(userData.message);
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.message);
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-primary bg-gradient text-white">
//               <h2 className="text-center">Login</h2>
//             </div>
//             <div className="card-body">
//               {error && <div className="alert alert-danger">{error}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn w-100">
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { useAuth } from "../../AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { updateAuthStatus } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userData = await UserService.login(email, password);
//       if (userData.token) {
//         localStorage.setItem("token", userData.token);
//         localStorage.setItem("role", userData.role);
//         updateAuthStatus();
//         navigate("/dashboard");
//       } else {
//         setError(userData.message);
//       }
//     } catch (error) {
//       setError(error.message);
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       {/* Login Banner */}
//       {/* <div className="relative w-full h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex justify-center items-center">
//         <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//       </div> */}

//       {/* Login Form Card */}
//       <div className="w-full max-w-md mt-10 px-6 py-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Login
//         </h2>

//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
//             role="alert"
//           >
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// //Login Page with Mobile number otp only.
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import { useAuth } from "../../AuthContext";

// export default function LoginPage() {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { updateAuthStatus } = useAuth();

//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await UserService.requestOtp(mobileNumber);
//       if (response.statusCode === 200) {
//         setOtpSent(true);
//         setError("");
//       } else {
//         setError(response.message || "Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       setError("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await UserService.verifyOtp(mobileNumber, otp);
//       if (response.statusCode === 200 && response.token) {
//         updateAuthStatus();
//         navigate("/dashboard");
//       } else {
//         setError(
//           response.message || "OTP verification failed. Please try again."
//         );
//       }
//     } catch (error) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const handleBack = () => {
//     setOtpSent(false);
//     setOtp("");
//     setError("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         <form
//           className="mt-8 space-y-6"
//           onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}
//         >
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="mobile-number" className="sr-only">
//                 Mobile Number
//               </label>
//               <input
//                 id="mobile-number"
//                 name="mobile"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Mobile Number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 disabled={otpSent}
//               />
//             </div>
//             {otpSent && (
//               <div>
//                 <label htmlFor="otp" className="sr-only">
//                   OTP
//                 </label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex items-center justify-between">
//             {otpSent && (
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
//               >
//                 Change mobile number
//               </button>
//             )}
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {otpSent ? "Verify OTP" : "Request OTP"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// Login with mobile or email option
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../AuthContext";

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [otpMethod, setOtpMethod] = useState("mobile");
  const navigate = useNavigate();
  const { updateAuthStatus } = useAuth();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const value = otpMethod === "mobile" ? mobileNumber : email;
      const response = await UserService.requestOtp(value, otpMethod);
      if (response.statusCode === 200) {
        setOtpSent(true);
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleRequestOtp:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const value = otpMethod === "mobile" ? mobileNumber : email;
      const response = await UserService.verifyOtp(value, otp, otpMethod);
      if (response.statusCode === 200 && response.token) {
        updateAuthStatus();
        navigate("/dashboard");
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error in handleVerifyOtp:", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleBack = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
  };

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-md w-full space-y-8">
  //         <div>
  //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
  //             Sign in to your account
  //           </h2>
  //         </div>
  //         {error && (
  //           <div
  //             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  //             role="alert"
  //           >
  //             <span className="block sm:inline">{error}</span>
  //           </div>
  //         )}
  //         <form
  //           className="mt-8 space-y-6"
  //           onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}
  //         >
  //           <input type="hidden" name="remember" value="true" />
  //           <div className="rounded-md shadow-sm -space-y-px">
  //             {!otpSent && (
  //               <div>
  //                 <label htmlFor="otp-method" className="sr-only">
  //                   OTP Method
  //                 </label>
  //                 <select
  //                   id="otp-method"
  //                   name="otp-method"
  //                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                   value={otpMethod}
  //                   onChange={(e) => setOtpMethod(e.target.value)}
  //                 >
  //                   <option value="mobile">Mobile</option>
  //                   <option value="email">Email</option>
  //                 </select>
  //               </div>
  //             )}
  //             {otpMethod === "mobile" && (
  //               <div>
  //                 <label htmlFor="mobile-number" className="sr-only">
  //                   Mobile Number
  //                 </label>
  //                 <input
  //                   id="mobile-number"
  //                   name="mobile"
  //                   type="tel"
  //                   required
  //                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                   placeholder="Mobile Number"
  //                   value={mobileNumber}
  //                   onChange={(e) => setMobileNumber(e.target.value)}
  //                   disabled={otpSent}
  //                 />
  //               </div>
  //             )}
  //             {otpMethod === "email" && (
  //               <div>
  //                 <label htmlFor="email" className="sr-only">
  //                   Email
  //                 </label>
  //                 <input
  //                   id="email"
  //                   name="email"
  //                   type="email"
  //                   required
  //                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                   placeholder="Email"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                   disabled={otpSent}
  //                 />
  //               </div>
  //             )}
  //             {otpSent && (
  //               <div>
  //                 <label htmlFor="otp" className="sr-only">
  //                   OTP
  //                 </label>
  //                 <input
  //                   id="otp"
  //                   name="otp"
  //                   type="text"
  //                   required
  //                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                   placeholder="Enter OTP"
  //                   value={otp}
  //                   onChange={(e) => setOtp(e.target.value)}
  //                 />
  //               </div>
  //             )}
  //           </div>

  //           <div className="flex items-center justify-between">
  //             {otpSent && (
  //               <button
  //                 type="button"
  //                 onClick={handleBack}
  //                 className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
  //               >
  //                 Change {otpMethod === "mobile" ? "mobile number" : "email"}
  //               </button>
  //             )}
  //           </div>

  //           <div>
  //             <button
  //               type="submit"
  //               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             >
  //               {otpSent ? "Verify OTP" : "Request OTP"}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}
        >
          <input type="hidden" name="remember" value="true" />

          {/* OTP Method Selection */}
          {!otpSent && (
            <div className="space-y-2">
              <label
                htmlFor="otp-method"
                className="text-sm font-medium text-gray-700"
              >
                Select Login Method
              </label>
              <select
                id="otp-method"
                name="otp-method"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={otpMethod}
                onChange={(e) => setOtpMethod(e.target.value)}
              >
                <option value="mobile">Mobile</option>
                <option value="email">Email</option>
              </select>
            </div>
          )}

          {/* Conditional Input Fields for Mobile or Email */}
          <div className="space-y-2">
            {otpMethod === "mobile" && !otpSent && (
              <div>
                <label
                  htmlFor="mobile-number"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile-number"
                  name="mobile"
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            )}

            {otpMethod === "email" && !otpSent && (
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* OTP Field */}
          {otpSent && (
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the OTP sent to your device"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {/* Change Method Button */}
          {otpSent && (
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Change {otpMethod === "mobile" ? "Mobile Number" : "Email"}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {otpSent ? "Verify OTP" : "Request OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
