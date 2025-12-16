import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/* CREATE BOOKING (USER) */
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, bookingData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create booking failed");
    }
  }
);

/* FETCH USER BOOKINGS (EMAIL) */
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/user/${email}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch bookings failed");
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/update",
  async ({ id, date, startTime, endTime, guests }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/bookings/update/${id}`,
        { date, startTime, endTime, guests }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);


/*  CANCEL BOOKING */
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/bookings/status/${id}`, {
        status: "cancelled",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Cancel failed");
    }
  }
);

/* ADMIN – FETCH ALL BOOKINGS */
export const getAllBookings = createAsyncThunk(
  "bookings/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Admin fetch failed");
    }
  }
);

/* ADMIN – APPROVE / REJECT */
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/bookings/status/${id}`, {
        status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Status update failed");
    }
  }
);

/* SLICE */
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        const i = state.items.findIndex(b => b._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        const i = state.items.findIndex(b => b._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const i = state.items.findIndex(b => b._id === action.payload._id);
        if (i !== -1) state.items[i] = action.payload;
      });
  },
});

export const selectAllBookings = (state) => state.bookings.items;
export default bookingSlice.reducer;
