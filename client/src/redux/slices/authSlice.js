import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROUTES } from "../../components/App/routeConfig";
import { ROLE_CONFIG } from "../../components/AuthWizard/config";
import authService from "../../services/authService";
import userService from "../../services/userService";

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  return await authService._signup(payload);
});

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  return await authService._signin(payload);
});

export const addClientProfile = createAsyncThunk(
  "auth/clientProfile",
  async (payload) => {
    return await userService._addClientProfile(payload);
  }
);

export const updateClientProfile = createAsyncThunk(
  "auth/updateClientProfile",
  async (payload) => {
    return await userService._updateClientProfile(payload);
  }
);

export const addCoachProfile = createAsyncThunk(
  "auth/coachProfile",
  async (payload) => {
    //to be updated to coachprofile service
    return await userService._addCoachProfile(payload);
  }
);

export const updateCoachProfile = createAsyncThunk(
  "auth/updateCoachProfile",
  async (payload) => {
    //to be updated to coachprofile service
    return await userService._updateCoachProfile(payload);
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
    [updateClientProfile.fulfilled]: (state, action) => {
      state.user.clientProfile = action?.payload;
      let isAdmin = state.user?.roles[0] === ROLE_CONFIG.ADMIN || false;
      if (isAdmin) {
        window.location.href = "/" + ROUTES.ADMIN_DASHBOARD;
      } else {
        localStorage.setItem("USER", JSON.stringify(state.user));
        window.location.href = "/" + ROUTES.CLIENT_DASHBOARD;
      }
    },
    [addCoachProfile.fulfilled]: (state, action) => {
      state.user.coachProfile = action?.payload;
      localStorage.setItem("USER", JSON.stringify(state.user));
      window.location.href = "/" + ROUTES.COACH_DASHBOARD;
    },
    [updateCoachProfile.fulfilled]: (state, action) => {
      state.user.coachProfile = action?.payload;
      localStorage.setItem("USER", JSON.stringify(state.user));
      window.location.href = "/" + ROUTES.COACH_DASHBOARD;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice;
