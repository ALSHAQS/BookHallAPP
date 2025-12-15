import React from "react";
import { motion } from "framer-motion";
import bg from "../Images/bg.png";
import "./css/Home.css"; // ملف الستايل الخاص بالهوم

const Home = () => {
  return (
    <div className="home-wrapper">

      {/* خلفية مع تغبيش وتدرج */}
      <div
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(90, 62, 43, 0.65), 
            rgba(193, 154, 107, 0.55)
          ), url(${bg})`,
        }}
      >
        {/* المحتوى النصي */}
        <motion.h1
          className="home-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Book Your Perfect Hall
        </motion.h1>

        <motion.h3
          className="home-sub"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Easy • Fast • Reliable
        </motion.h3>

        <motion.p
          className="home-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
        >
          Discover and reserve the ideal venue for weddings, events, meetings and more.
        </motion.p>

        {/* الأزرار */}
        <motion.div
          className="home-btns"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          <a href="/login" className="btn-main home-btn">
            Log In
          </a>
          <a href="/Signup" className="btn-gold home-btn">
            Sign Up
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
