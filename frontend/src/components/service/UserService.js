import axios from "axios";

class UserService {
  // static BASE_URL = "http://localhost:8080";
  static BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // static async login(email, password) {
  //   try {
  //     const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("role", response.data.role);
  //     return response.data;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  //requestOtp with mobile or email option
  static async requestOtp(value, method) {
    try {
      console.log(`Requesting OTP for ${method}: ${value}`);
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/send-otp`,
        {
          [method === "mobile" ? "mobileNo" : "email"]: value,
        }
      );
      console.log("OTP request response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error requesting OTP:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  // verifyOtp method with mobile and email option.
  static async verifyOtp(value, otp, method) {
    try {
      console.log(`Verifying OTP for ${method}: ${value}`);
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/verify-otp`,
        {
          [method === "mobile" ? "mobileNo" : "email"]: value,
          otp: otp,
        }
      );
      console.log("OTP verification response:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  // Add this method to UserService.js
  static async sendBookingOtp(userId) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/send-booking-otp/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error sending booking OTP:", error);
      throw error;
    }
  }

  // verifyBookingOtp method with mobile and email option.
  static async verifyBookingOtp(mobileNumber, otp) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/verify-booking-otp`,
        { mobileNo: mobileNumber, otp: otp }
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying booking OTP:", error);
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getYourProfile(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateAvatar(userId, token, avatarStyle) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/user/update-avatar/${userId}`,
        { avatarStyle: avatarStyle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
