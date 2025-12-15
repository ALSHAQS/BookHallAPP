import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, cancelBooking } from "../Features/BookingSlice";
import { useNavigate } from "react-router-dom";
import "./css/MyBooking.css";
import Location from "./Location";

const MyBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const user = useSelector((state) => state.users.user);
  const bookings = useSelector((state) => state.bookings.items);
  const status = useSelector((state) => state.bookings.status);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchUserBookings(user.email));
    }
  }, [dispatch, user]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(id));
    }
  };


  const handleViewDetails = (booking) => {
    navigate("/UpdateBooking", { state: { booking } });
  };

  return (
    <div className="my-bookings-page">
    <div className="location-box">
    <h4>Your Location</h4>
    <Location/>
  
</div>

      <h2 className="page-title">My Bookings</h2>
  

      {status === "loading" && <p className="loading-text">Loading...</p>}

      {bookings.length === 0 && (
        <p className="empty-text">No bookings found</p>
      )}
    

      <div className="booking-list">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <div className="booking-info">
              <h3>{booking.roomName}</h3>
              <p>Email: {booking.userEmail}</p>

              <span className={`status ${booking.status}`}>
                {booking.status}
              </span>
            </div>

            <div className="booking-actions">
              <button
  className="view-btn"
  onClick={() => navigate(`/UpdateBooking/${booking._id}`)}
>
  View Details
</button>


              {booking.status === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
