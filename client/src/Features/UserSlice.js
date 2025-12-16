import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/*  REGISTER USER */
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Register failed");
    }
  }
);

/* LOGIN USER */
export const login = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

/* LOGOUT */
export const logout = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("user");
});

/* INITIAL STATE */
const savedUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: savedUser || null,
    isLogin: !!savedUser,
    msg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* REGISTER */
      .addCase(registerUser.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.msg = action.payload;
      })

      /* LOGIN */
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
        state.msg = action.payload.msg;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.msg = action.payload;
      })

      /* LOGOUT */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLogin = false;
      });
  },
});

export default userSlice.reducer;
