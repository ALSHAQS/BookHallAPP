import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../Features/BookingSlice";
import "./css/BookingDetails.css";

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const room = location.state?.room;

  
  // HOOKS (ALWAYS FIRST)
  
  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // GUARD
  if (!room) {
    return <p className="error-text">Hall details not available.</p>;
  }

  // CALCULATE HOURS (LIVE + INTEGER)
  const calculateHours = () => {
    if (!startTime || !endTime) return 0;

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    //  End before start 
    if (end <= start) return 0;

    const diff = (end - start) / (1000 * 60 * 60);
    return Math.floor(diff);
  };

  const hours = calculateHours();
  const basePrice = hours * room.price;
  const discount = hours >= 3 ? basePrice * 0.1 : 0;
  const finalPrice = basePrice - discount;

  // SUBMIT
  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("Please login first");
      return;
    }

    if (hours <= 0) {
      alert("End time must be after start time");
      return;
    }

    const confirmed = window.confirm(
      `Confirm booking?\nHours: ${hours}\nTotal: ${finalPrice.toFixed(2)} OMR`
    );

    if (!confirmed) return;

    const bookingData = {
      userEmail: user.email,
      fullName,
      roomId: room._id,
      roomName: room.name,
      date,
      startTime,
      endTime,
      hours,
      totalPrice: finalPrice,
      status: "pending",
    };

    await dispatch(createBooking(bookingData));
    navigate("/MyBooking");
  };

  return (
    <div className="booking-details-page">
      <div className="booking-details-card">
        <h2 className="card-title">Confirm Your Booking</h2>

        <form onSubmit={handleConfirmBooking} className="booking-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input type="email" value={user.email} disabled />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="time-row">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          {/* TIME ERROR */}
          {startTime && endTime && hours === 0 && (
            <p className="time-error">
              End time must be after start time
            </p>
          )}

          <p className="price-hint">
            Price per hour: <strong>{room.price} OMR</strong>
          </p>

          <div className="price-summary">
            <p>
              Hours <span>{hours}</span>
            </p>
            <p>
              Base Price <span>{basePrice.toFixed(2)} OMR</span>
            </p>
            {discount > 0 && (
              <p className="discount">
                Discount <span>-{discount.toFixed(2)} OMR</span>
              </p>
            )}
            <p className="final-price">
              Total <span>{finalPrice.toFixed(2)} OMR</span>
            </p>
          </div>

          <button
            type="submit"
            className="confirm-btn"
            disabled={hours <= 0}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetails;
