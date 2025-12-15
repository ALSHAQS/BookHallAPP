// src/components/UserDashboard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, selectAllRooms } from "../Features/RoomSlice";

import RoomCard from "./Rooms/RoomCard";
import "./css/UserDashboard.css";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const allRooms = useSelector(selectAllRooms);
  const roomsStatus = useSelector((state) => state.rooms.status);

  const [displayedRooms, setDisplayedRooms] = useState([]);

  // ======================
  // FETCH ROOMS
  // ======================
  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, roomsStatus]);

  useEffect(() => {
    if (roomsStatus === "succeeded") {
      setDisplayedRooms(allRooms);
    }
  }, [roomsStatus, allRooms]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay"></div>

      <div className="dashboard-content container">
        <h1 className="dashboard-title text-center">
          Available Halls
        </h1>

        {roomsStatus === "loading" && (
          <p className="lead text-center">Loading halls...</p>
        )}

        {roomsStatus === "failed" && (
          <p className="text-danger text-center">
            Failed to load halls.
          </p>
        )}

        {roomsStatus === "succeeded" && displayedRooms.length === 0 && (
          <p className="lead text-center">
            No halls available.
          </p>
        )}

        {roomsStatus === "succeeded" && displayedRooms.length > 0 && (
          <div className="rooms-grid">
            {displayedRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
