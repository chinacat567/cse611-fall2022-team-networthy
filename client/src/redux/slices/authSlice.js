import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../../services/authService";

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  return await authService.signup(payload);
});

// const USER_TOKEN = JSON.parse(localStorage.getItem("USER_TOKEN"));

const initialState = { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice;
