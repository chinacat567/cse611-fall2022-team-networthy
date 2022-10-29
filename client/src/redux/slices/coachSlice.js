import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import coachService from "../../services/coachService";

export const getAllCoaches = createAsyncThunk(
  "coach/getAllCoaches",
  async () => {
    return await coachService._getAllCoaches();
  }
);

export const getAssignedCoach = createAsyncThunk(
  "coach/getAssignedCoach",
  async (payload) => {
    return await coachService._getAssignedCoach(payload);
  }
);

export const assignCoach = createAsyncThunk(
  "coach/assignCoach",
  async (payload) => {
    let res = await coachService._deleteAssignedCoach(payload);
    if (res) {
      return await coachService._assignCoach(payload);
    }
    return;
  }
);

export const coachSlice = createSlice({
  name: "coach",
  initialState: {
    allCoaches: [],
    assignedCoach: {},
  },
  reducers: {},
  extraReducers: {
    [getAllCoaches.fulfilled]: (state, action) => {
      state.allCoaches = action?.payload;
    },
    [getAssignedCoach.fulfilled]: (state, action) => {
      state.assignedCoach = action?.payload;
    },
    [assignCoach.fulfilled]: (state, action) => {
      if (action.payload) {
        state.assignedCoach = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = coachSlice.actions;

export default coachSlice;
