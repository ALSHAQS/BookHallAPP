import React from "react";
import { motion } from "framer-motion";
import "./css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About BookMyHall</h1>
          <p>
            A modern platform to book luxury event halls easily, securely,
            and professionally.
          </p>
        </motion.div>
      </section>

      {/* VIDEO */}
      <section className="about-video-section">
        <motion.video
          className="about-video-player"
          autoPlay
          muted
          loop
          controls
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </motion.video>
      </section>

      {/* INFO */}
      <section className="about-info">
        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <h3>Who We Are</h3>
          <p>
            We provide a seamless hall booking experience for weddings,
            meetings, and special events.
          </p>
        </motion.div>

        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <h3>Our Mission</h3>
          <p>
            To simplify hall booking with a secure system and elegant user
            experience.
          </p>
        </motion.div>

        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <h3>Why BookMyHall</h3>
          <p>
            Verified halls, admin approval, real-time booking,
            and modern design.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;
