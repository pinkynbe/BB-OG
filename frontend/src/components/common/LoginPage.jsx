// Login with mobile or email option
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [otpMethod, setOtpMethod] = useState("mobile");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateAuthStatus } = useAuth();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setError("");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const trimmedOtp = otp.trim();
      const value = otpMethod === "mobile" ? mobileNumber : email;
      const response = await UserService.verifyOtp(
        value,
        trimmedOtp,
        otpMethod
      );
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
  };

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
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3" />
              ) : null}
              {otpSent ? "Verify OTP" : "Request OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
