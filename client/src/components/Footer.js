import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>BookMyHall</h2>
          <p>
            A modern platform for booking luxury event halls easily and securely.
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@bookmyhall.com</p>
          <p>Phone: +968 9999 9999</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BookMyHall. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
