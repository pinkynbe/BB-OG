import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/common/Footer";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import { useAuth } from "./AuthContext";
import Dashboard from "./components/userspage/Dashboard";

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
        </>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
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
