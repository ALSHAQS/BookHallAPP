import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";

// User Pages
import UserDashboard from "./components/UserDashboard";
import MyBooking from "./components/MyBooking";
import BookingDetails from "./components/BookingDetails";
import UpdateBooking from "./components/UpdateBooking";

// Admin Pages
import AdminDashboard from "./components/AdminDashboard";
import AddNewRoom from "./components/AddNewRoom";
import BookingApproval from "./components/BookingApproval";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Global CSS
import "./components/css/global.css";

test("dummy test", () => {
  expect(true).toBe(true);
});

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER ROUTES */}
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mybooking"
          element={
            <ProtectedRoute role="user">
              <MyBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingdetails/:id"
          element={
            <ProtectedRoute role="user">
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updatebooking/:id"
          element={
            <ProtectedRoute role="user">
              <UpdateBooking />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addnewroom"
          element={
            <ProtectedRoute role="admin">
              <AddNewRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingapproval"
          element={
            <ProtectedRoute role="admin">
              <BookingApproval />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
