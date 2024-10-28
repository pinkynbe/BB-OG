import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import LoginPage from "./components/common/LoginPage";
import RegistrationPage from "./components/admin/RegistrationPage";
import Navbar from "./components/common/Navbar";
import FooterComponent from "./components/common/Footer";
import UpdateUser from "./components/admin/UpdateUser";
import UserManagementPage from "./components/admin/UserManagementPage";
import ProfilePage from "./components/common/ProfilePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import UserBookingHistory from "./components/common/UserBookingHistory";
import BulkBooking from "./components/admin/BulkBooking";
import TatkalBooking from "./components/admin/TatkalBooking";
import MIS from "./components/admin/MIS";
import Search from "./components/admin/Search";

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={isAuthenticated ? <Navigate to="/profile" /> : <LoginPage />}
      />
      <Route
        exact
        path="/login"
        element={isAuthenticated ? <Navigate to="/profile" /> : <LoginPage />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
      />
      {isAdmin && (
        <>
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
          />
          <Route path="/update-user/:userId" element={<UpdateUser />} />
          <Route path="/admin/bulk-booking" element={<BulkBooking />} />
          <Route path="/admin/tatkal-booking" element={<TatkalBooking />} />
          <Route path="/admin/search" element={<Search />} />
          <Route path="/admin/mis" element={<MIS />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? (
            isAdmin ? (
              <UserBookingHistory />
            ) : (
              <UserBookingHistory />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <AppRoutes />
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
