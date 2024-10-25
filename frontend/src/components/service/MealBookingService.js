import axios from "axios";

class MealBookingService {
  static BASE_URL = "http://localhost:8085/api/bookings";

  static async bookMeal(userId, bookingData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${MealBookingService.BASE_URL}/create/${userId}`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async cancelBooking(userId, bookingId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${MealBookingService.BASE_URL}/cancel/${userId}/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserBookingsForDate(userId, date) {
    try {
      const token = localStorage.getItem("token");
      const url = date
        ? `${MealBookingService.BASE_URL}/user/${userId}?date=${date}`
        : `${MealBookingService.BASE_URL}/user/${userId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getTodayBookings(userId, date) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${MealBookingService.BASE_URL}/today/${userId}?date=${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllBookings(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${MealBookingService.BASE_URL}/all/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async bookEmergencyMeal(userId, bookingData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${MealBookingService.BASE_URL}/emergency/${userId}`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default MealBookingService;
