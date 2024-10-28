import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function BulkBooking() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [refNo, setRefNo] = useState("");
  const [remark, setRemark] = useState("");
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (UserService.isAuthenticated()) {
          const token = localStorage.getItem("token");
          const userProfile = await UserService.getYourProfile(token);
          setCurrentUserId(userProfile.user.id);
          // fetchBookingHistory(userProfile.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log({ purpose, date, mealCount, referenceNo, remark });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const bookDate = new Date(date);

    if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      alert("Cannot book for past days.");
      return;
    }

    // const isToday = bookDate.toDateString() === now.toDateString();
    // if (isToday && now.getHours() >= 11) {
    //   alert("Booking is not allowed after 11:00 AM for today.");
    //   return;
    // }

    try {
      await MealBookingService.bookMeal(currentUserId, {
        date,
        mealCount,
        event,
        remark,
        refNo,
      });
      setMessage("Booking successful!");
      setDate("");
      setMealCount(1);
      alert("Meal booked successfully!");
      // fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking meal:", error);
      setMessage("Error creating booking. Please try again.");
      alert("Failed to book meal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Bulk Booking</h2>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="event" className="form-label">
                    Purpose of Booking
                  </label>
                  <select
                    id="event"
                    className="form-select"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
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

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mealCount" className="form-label">
                    Number of Meals
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mealCount"
                    min="1"
                    value={mealCount}
                    onChange={(e) => setMealCount(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="refNo" className="form-label">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="refNo"
                    value={refNo}
                    onChange={(e) => setRefNo(e.target.value)}
                    placeholder="Enter reference number"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    rows="3"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter any additional remarks"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
