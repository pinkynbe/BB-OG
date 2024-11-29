import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import LoginPage from "./components/common/LoginPage";
import ProfilePage from "./components/common/ProfilePage";
import UpdateUser from "./components/admin/UpdateUser";
import RegistrationPage from "./components/admin/RegistrationPage";
import UserManagementPage from "./components/admin/UserManagementPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBookingHistory from "./components/admin/AdminBookingHistory";
import BulkBooking from "./components/admin/BulkBooking";
import EmergencyBooking from "./components/admin/EmergencyBooking";
import MIS from "./components/admin/MIS";
import UserDashboard from "./components/user/UserDashboard";
import UserBookingHistory from "./components/user/UserBookingHistory";
import UploadMenu from "./components/admin/UploadMenu";
import Layout from "./components/Layout";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./components/contexts/LanguageContext";

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
          <Route
            path="/admin/emergency-booking"
            element={<EmergencyBooking />}
          />
          <Route path="/admin/upload-menu" element={<UploadMenu />} />
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
              <AdminBookingHistory />
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
      <ThemeProvider>
        <BrowserRouter>
          <div className="App">
            <LanguageProvider>
              {/* <Navbar /> */}
              <Layout>
                <div className="content">
                  <AppRoutes />
                </div>
              </Layout>
              {/* <FooterComponent /> */}
            </LanguageProvider>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
