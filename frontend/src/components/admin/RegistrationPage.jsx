import React, { useState } from "react";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    mobileNo: "",
    pan: "",
    role: "USER",
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     // [name]: name === "role" ? value.toUpperCase() : value, // Convert only 'role' to uppercase
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Role: ", formData.role);
    try {
      // Call the register method from UserService

      const token = localStorage.getItem("token");
      await UserService.register(formData, token);

      // Clear the form fields after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        department: "",
        mobileNo: "",
        pan: "",
        role: "",
      });
      alert("User registered successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Enter Designation"
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Enter Department"
            required
          />
        </div> */}
        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Department</option>
            <option value="IT Section">USER</option>
            <option value="Admin">Admin</option>
            <option value="Establishment">Establishment</option>
            <option value="Thesis">Thesis</option>
            <option value="DOEC">DOEC</option>
            <option value="Confidential">Confidential</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className="form-group">
          <label>Pan No:</label>
          <input
            type="text"
            name="pan"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter Pan Number"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
