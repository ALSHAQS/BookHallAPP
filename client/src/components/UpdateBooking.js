// src/components/UpdateBooking.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBookings, updateBooking } from "../Features/BookingSlice";
import "./css/UpdateBooking.css";

const UpdateBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookings = useSelector((state) => state.bookings.items);
  const user = useSelector((state) => state.users.user);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    guests: 1,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchUserBookings(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const booking = bookings.find((b) => b._id === id);
    if (booking) {
      setForm({
        date: booking.date?.split("T")[0],
        startTime: booking.startTime,
        endTime: booking.endTime,
        guests: booking.guests || 1,
      });
    }
  }, [bookings, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await dispatch(updateBooking({ id, ...form }));

    alert("✅ Booking updated successfully");
    navigate("/MyBooking");
  };

  return (
    <div className="update-page">
      <div className="update-card">
        <h2>Update Booking</h2>

        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />

          <label>Start Time</label>
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />

          <label>End Time</label>
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />

          <label>Guests</label>
          <input type="number" min="1" name="guests" value={form.guests} onChange={handleChange} />

          <button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Booking"}
          </button>

          <button type="button" className="cancel" onClick={() => navigate("/MyBooking")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooking;
