import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Booking from "./Models/BookingModel.js";
import RoomModel from "./Models/RoomModel.js";
import User from "./Models/UserModel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// MongoDB Connection
// =======================
const connectString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@postitcluster.qghdnct.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connectString)

// =======================
// SERVER PORT
// =======================
app.listen(process.env.PORT, () => {
  console.log("You are connected");
});

// =======================================================
// REGISTER USER
// =======================================================
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      msg: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ msg: "Registration failed" });
  }
});

// =======================================================
// LOGIN USER / ADMIN
// =======================================================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      msg: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ msg: "Login failed" });
  }
});

// =======================================================
// GET ROOMS
// =======================================================
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch {
    res.status(500).json({ msg: "Failed to fetch rooms" });
  }
});

// =======================================================
// ADD ROOM (ADMIN)
// =======================================================
app.post("/rooms", async (req, res) => {
  try {
    const room = await RoomModel.create(req.body);
    res.status(201).json(room);
  } catch {
    res.status(500).json({ msg: "Failed to add room" });
  }
});

// =======================================================
// ✅ CREATE BOOKING (FIXED – VERY IMPORTANT)
// =======================================================
app.post("/bookings", async (req, res) => {
  try {
    const {
      userEmail,
      roomId,
      roomName,
      date,
      startTime,
      endTime,
      hours,
      totalPrice,
      status,
    } = req.body;

    const booking = await Booking.create({
      userEmail,
      roomId,
      roomName,
      date: new Date(date),   // 🔴 مهم
      startTime,
      endTime,
      hours,
      totalPrice,
      status: status || "pending",
    });

    res.status(201).json(booking); // 🔥 رجّع الكائن مباشرة
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    res.status(500).json({ msg: "Failed to create booking" });
  }
});

// =======================================================
// GET ALL BOOKINGS (ADMIN)
// =======================================================
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch {
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
});

// =======================================================
// UPDATE BOOKING STATUS (ADMIN)
// =======================================================
app.patch("/bookings/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch {
    res.status(500).json({ msg: "Failed to update booking status" });
  }
});

// =======================================================
// GET USER BOOKINGS
// =======================================================
app.get("/bookings/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userEmail: req.params.email.toLowerCase(),
    });
    res.json(bookings);
  } catch {
    res.status(500).json({ msg: "Failed to fetch user bookings" });
  }
});
// =======================
// UPDATE BOOKING DETAILS (USER)
// =======================
app.patch("/bookings/update/:id", async (req, res) => {
  try {
    const { date, startTime, endTime, guests } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        date: new Date(date),
        startTime,
        endTime,
        guests,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("UPDATE BOOKING ERROR:", error);
    res.status(500).json({ msg: "Failed to update booking" });
  }
});
