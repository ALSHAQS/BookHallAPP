import React, { useState } from "react";
import "../css/UserDashboard.css";

const RoomSearchForm = ({ handleSearchResults }) => {
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    
    const criteria = { capacity, price, date };

    handleSearchResults([], criteria);
  };

  return (
    <form onSubmit={submitHandler} className="room-search-card">

      <h4 className="room-search-title">Search for a Hall</h4>

      <div className="room-search-grid">

        {/* Capacity */}
        <div className="room-search-field">
          <label className="room-search-label">Capacity</label>
          <input
            type="number"
            placeholder="e.g., 50"
            className="room-search-input"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        {/* Max Price */}
        <div className="room-search-field">
          <label className="room-search-label">Max Price</label>
          <input
            type="number"
            placeholder="e.g., 200"
            className="room-search-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="room-search-field">
          <label className="room-search-label">Date</label>
          <input
            type="date"
            className="room-search-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

      </div>

      <button className="room-search-btn" type="submit">
        Search Halls
      </button>
    </form>
  );
};

export default RoomSearchForm;
