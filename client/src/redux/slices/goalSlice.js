import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "../../services/goalService";

export const getAllClientGoals = createAsyncThunk(
  "goal/getAllClientGoals",
  async (payload) => {
    return await goalService._getAllClientGoals(payload);
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState: {
    goalList: [],
  },
  reducers: {},
  extraReducers: {
    [getAllClientGoals.fulfilled]: (state, action) => {
      state.goalList = action?.payload || [];
    },
  },
});

// Action creators are generated for each case reducer function
// export const {  } = goalSlice.actions;

export default goalSlice;
