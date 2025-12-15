import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";

import "./css/Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msg } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      navigate("/Login");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">
        
        <img src={logo} alt="logo" className="register-logo" />

        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Join us and book your halls easily</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            className="register-input"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            className="register-input"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            className="register-input"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className="btn-register">
            Sign Up
          </button>

          <div className="server-message">{msg}</div>

          <p className="register-bottom-text">
            Already have an account?
            <span onClick={() => navigate("/Login")}> Log In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
