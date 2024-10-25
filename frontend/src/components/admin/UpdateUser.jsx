import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    mobileNo: "",
    pan: "",
    role: "",
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); //whenever there is a change in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      const { name, email, designation, department, mobileNo, pan, role } =
        response.user;
      setUserData({
        name,
        email,
        designation,
        department,
        mobileNo,
        pan,
        role,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData((prevUserData) => ({
  //     ...prevUserData,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: name === "role" ? value.toUpperCase() : value, // Convert only 'role' to uppercase
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={userData.designation}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={userData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="number"
            name="mobileNo"
            value={userData.mobileNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Pan No:</label>
          <input
            type="text"
            name="pan"
            value={userData.pan}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
