import React, { useState, useEffect } from "react";
import MealBookingService from "../service/MealBookingService";
import UserService from "../service/UserService";

export default function UserDashboard() {
  const [date, setDate] = useState("");
  const [mealCount, setMealCount] = useState(1);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

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

  //Booking
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
      await MealBookingService.bookMeal(currentUserId, {
        date,
        mealCount,
      });
      setMessage("Booking successful!");
      setDate("");
      setMealCount(1);
      alert("Meal booked successfully!");
      fetchBookingHistory(currentUserId);
    } catch (error) {
      console.error("Error booking meal:", error);
      setMessage("Error creating booking. Please try again.");
      alert("Failed to book meal. Please try again.");
    }
  };

  //Booking History
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

  //added for sorting
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setBookingHistory(sortBookings([...bookingHistory], newOrder));
  };

  //added for sorting
  const sortBookings = (bookings, order) => {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  //Booking Cancellation

  const handleCancelMeal = async (bookingId, bookingDate) => {
    // const now = new Date();
    // const today = new Date();
    // const bookingDateObj = new Date(bookingDate);

    // if (bookingDateObj < today.setHours(0, 0, 0, 0)) {
    //   alert("Cannot cancel past bookings.");
    //   return;
    // }

    // if (bookingDateObj.toDateString() === now.toDateString()) {
    //   const cancellationDeadline = new Date(
    //     now.getFullYear(),
    //     now.getMonth(),
    //     now.getDate(),
    //     11,
    //     0,
    //     0
    //   );

    //   if (now > cancellationDeadline) {
    //     alert(
    //       "Meal cancellation is only allowed until 11:00 AM for today's bookings."
    //     );
    //     return;
    //   }
    // }

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
    // const now = new Date();
    // const bookingDateObj = new Date(bookingDate);

    // if (bookingDateObj < now.setHours(0, 0, 0, 0)) {
    //   return false;
    // }

    // if (bookingDateObj.toDateString() === now.toDateString()) {
    //   const cancellationDeadline = new Date(
    //     now.getFullYear(),
    //     now.getMonth(),
    //     now.getDate(),
    //     11,
    //     0,
    //     0
    //   );

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Book a Meal</h2>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleBookMeal}>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
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
                    max="10"
                    value={mealCount}
                    onChange={(e) => setMealCount(parseInt(e.target.value))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Book Meal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Current Booking Table */}
      <div className="currentBooking">
        <h2 className="text-center mb-4">Current Bookings</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th className="cursor-pointer" onClick={handleSort}>
                  Date
                  <span className="ml-2">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th>Number of Meals</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking.bookId}>
                  <td>{booking.bookId}</td>
                  <td>{booking.date}</td>
                  <td>{booking.mealCount}</td>
                  <td>{booking.cancelled ? "Cancelled" : "Booked"}</td>
                  <td>
                    {!booking.cancelled && isCancellable(booking.date) && (
                      <button
                        className="btn btn-sm btn-danger"
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
  );
}
