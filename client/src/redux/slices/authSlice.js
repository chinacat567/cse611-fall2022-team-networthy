import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROUTES } from "../../components/App/routeConfig";
import authService from "../../services/authService";
import clientService from "../../services/clientService";

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  return await authService._signup(payload);
});

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  return await authService._signin(payload);
});

export const addClientProfile = createAsyncThunk(
  "auth/clientProfile",
  async (payload) => {
    return await clientService._addClientProfile(payload);
  }
);

const user = JSON.parse(localStorage.getItem("USER"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [signin.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [addClientProfile.fulfilled]: (state, action) => {
      state.user.clientProfile = action?.payload;
      localStorage.setItem("USER", JSON.stringify(state.user));
      window.location.href = "/" + ROUTES.CLIENT_DASHBOARD;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice;
