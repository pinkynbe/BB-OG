import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, updateAuthStatus } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
      updateAuthStatus();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-secondary bg-gradient">
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/">CMS</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/history">Booking History</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to="/admin/user-management">User Management</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
