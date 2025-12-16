import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 // Fetch All Rooms (User + Admin)
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms`);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load rooms");
    }
  }
);

//  Add New Room (Admin)
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms`, roomData);
      return res.data.room;
    } catch (err) {
      return rejectWithValue("Failed to add room");
    }
  }
);

// Initial State
const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};


// Room Slice
const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Room
      .addCase(addRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

//  Selectors
export const selectAllRooms = (state) => state.rooms.items;
export default roomSlice.reducer;
