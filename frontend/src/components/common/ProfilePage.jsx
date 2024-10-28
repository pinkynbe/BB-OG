import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.user);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <div className="profile-page-container">
      <h2>Profile Information</h2>
      <p>Name: {profileInfo.name}</p>
      <p>Email: {profileInfo.email}</p>
      <p>Designation: {profileInfo.designation}</p>
      <p>Department: {profileInfo.department}</p>
      <p>Mobile No: {profileInfo.mobileNo}</p>
      <p>Pan No: {profileInfo.pan}</p>
      {isAdmin && (
        <button>
          <Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
        </button>
      )}
    </div>
  );
}
