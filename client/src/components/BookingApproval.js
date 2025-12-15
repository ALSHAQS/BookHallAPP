import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  updateBookingStatus,
} from "../Features/BookingSlice";
import "./css/BookingApproval.css";

const BookingApproval = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.items);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const approve = (id) =>
    dispatch(updateBookingStatus({ id, status: "approved" }));

  const reject = (id) =>
    dispatch(updateBookingStatus({ id, status: "rejected" }));

  return (
    <div className="approval-page">
      <h2>Booking Approval</h2>

      <table className="approval-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Hall</th>
            <th>Date</th>
            <th>Time</th>
            <th>Hours</th>
            <th>Total (OMR)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.userEmail}</td>
              <td>{b.roomName}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>{b.startTime} - {b.endTime}</td>
              <td>{b.hours}</td>
              <td>{b.totalPrice}</td>
              <td className={`status ${b.status}`}>
                {b.status}
              </td>
              <td>
                {b.status === "pending" && (
                  <>
                    <button
                      className="btn approve"
                      onClick={() => approve(b._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn reject"
                      onClick={() => reject(b._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingApproval;
