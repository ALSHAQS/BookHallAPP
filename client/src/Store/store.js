import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import bookingsReducer from "../Features/BookingSlice";
import roomsReducer from "../Features/RoomSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bookings: bookingsReducer,
    rooms: roomsReducer,   // ← مهم جدًا
  },
});
