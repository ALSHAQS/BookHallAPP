import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../Features/RoomSlice";
import "./css/AddNewRoom.css";

const AddNewRoom = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addRoom(formData));

    setSuccess(true);
    setFormData({
      name: "",
      capacity: "",
      price: "",
      image: "",
      description: "",
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="add-room-page">
      <div className="add-room-card">

        <h2 className="add-room-title">Add New Hall</h2>

        {success && (
          <div className="success-msg">
            ✅ Hall added successfully
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Capacity</label>
            <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Price</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <button className="submit-btn">Add Hall</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewRoom;
