import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8085";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // New requestOtp method with mobile only.
  // static async requestOtp(mobileNumber) {
  //   try {
  //     const response = await axios.post(
  //       `${UserService.BASE_URL}/auth/send-otp`,
  //       { mobileNo: mobileNumber }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
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

  // New verifyOtp method with mobile only.
  // static async verifyOtp(mobileNumber, otp) {
  //   try {
  //     const response = await axios.post(
  //       `${UserService.BASE_URL}/auth/verify-otp`,
  //       { mobileNo: mobileNumber, otp: otp }
  //     );
  //     if (response.data.token) {
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("role", response.data.role);
  //     }
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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
