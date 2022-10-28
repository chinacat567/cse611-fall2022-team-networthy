import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "../../services/goalService";

export const getAllClientGoals = createAsyncThunk(
  "goal/getAllClientGoals",
  async (payload) => {
    return await goalService._getAllClientGoals(payload);
  }
);

export const updateGoalStatus = createAsyncThunk(
  "goal/updateGoalStatus",
  async (payload) => {
    return await goalService._updateGoalStatus(payload);
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
    [updateGoalStatus.fulfilled]: (state, action) => {
      state.goalList.forEach((goal, index, list) => {
        if (goal.goalId == action.payload.goalId) {
          list[index].goalStatus = action.payload.updatedStatus;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
// export const { } = goalSlice.actions;

export default goalSlice;
