import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    roomName: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    hours: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 🔴 هذا السطر هو الحل
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
