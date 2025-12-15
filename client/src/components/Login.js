import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogin, msg } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  // 🔁 REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isLogin && user) {
      if (user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/UserDashboard");
      }
    }
  }, [isLogin, user, navigate]);

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {msg && <p className="error-msg">{msg}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
