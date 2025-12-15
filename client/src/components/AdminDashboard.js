import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/AdminDashboard.css";

const API = "http://localhost:3001";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsRes = await axios.get(`${API}/rooms`);
        const bookingsRes = await axios.get(`${API}/bookings`);

        setRooms(Array.isArray(roomsRes.data) ? roomsRes.data : []);
        setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      } catch (error) {
        console.error("Dashboard load error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  const pendingCount = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="cards-wrapper">
        {/* ===== Total Rooms ===== */}
        <div
          className="dashboard-card clickable"
          onClick={() => navigate("/AddNewRoom")}
        >
          <h4>Total Rooms</h4>
          <span>{rooms.length}</span>
        </div>

        {/* ===== Total Bookings ===== */}
        <div
          className="dashboard-card"
          title="All bookings"
        >
          <h4>Total Bookings</h4>
          <span>{bookings.length}</span>
        </div>

        {/* ===== Pending Requests ===== */}
        <div
          className="dashboard-card clickable highlight"
          onClick={() => navigate("/BookingApproval")}
        >
          <h4>Pending Requests</h4>
          <span>{pendingCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
