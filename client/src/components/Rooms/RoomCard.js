import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/RoomCard.css";

const RoomCard = ({ room, bookingCriteria }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/BookingDetails/${room._id}`, {
      state: {
        room,               // ✅ هذا المهم
        bookingCriteria,    // (اختياري)
      },
    });
  };

  return (
    <div className="room-card">
      <div className="room-image-wrapper">
        <img
          src={room.image}
          alt={room.name}
          className="room-image"
        />
      </div>

      <div className="room-card-body">
        <h4 className="room-title">{room.name}</h4>

        <p className="room-text">
          Capacity: <strong>{room.capacity}</strong> persons
        </p>

        <p className="room-text">
          Price: <strong>{room.price} OMR</strong>
        </p>

        <button className="room-btn" onClick={handleViewDetails}>
          Booking NOW
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
