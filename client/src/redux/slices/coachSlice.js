import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import coachService from "../../services/coachService";

export const getAllCoaches = createAsyncThunk(
  "coach/getAllCoaches",
  async () => {
    return await coachService._getAllCoaches();
  }
);

export const getAllCoachesAdmin = createAsyncThunk(
  "coach/getAllCoachesAdmin",
  async () => {
    return await coachService._getAllCoachesAdmin();
  }
);

export const getAllCoachClients = createAsyncThunk(
  "coach/getAllCoachClients",
  async (payload) => {
    return await coachService._getAllCoachClients(payload);
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
    if (payload?.assignedCoach?.username) {
      // Nothing to delete when no coach is assigned
      let res = await coachService._deleteAssignedCoach(payload);
      if (res) {
        return await coachService._assignCoach(payload);
      }
    } else {
      return await coachService._assignCoach(payload);
    }
  }
);

export const deleteCoachProfile = createAsyncThunk(
  "coach/deleteCoachProfile",
  async (payload) => {
    return await coachService._deleteCoachProfile(payload);
  }
);

export const approveCoach = createAsyncThunk(
  "coach/approveCoach",
  async (payload) => {
    return await coachService._approveCoach(payload);
  }
);

export const coachSlice = createSlice({
  name: "coach",
  initialState: {
    allCoaches: [],
    assignedCoach: {},
    coachClients: [],
  },
  reducers: {},
  extraReducers: {
    [getAllCoaches.fulfilled]: (state, action) => {
      state.allCoaches = action?.payload;
    },
    [getAllCoachesAdmin.fulfilled]: (state, action) => {
      state.allCoaches = action?.payload;
    },
    [getAllCoachClients.fulfilled]: (state, action) => {
      state.coachClients = action?.payload;
    },
    [getAssignedCoach.fulfilled]: (state, action) => {
      state.assignedCoach = action?.payload;
    },
    [assignCoach.fulfilled]: (state, action) => {
      if (action.payload) {
        state.assignedCoach = action.payload;
      }
    },
    [deleteCoachProfile.fulfilled]: (state, action) => {
      if (action.payload) {
        state.allCoaches = state.allCoaches.filter(
          (x) => x?.username !== action.payload
        );
      }
    },
    [approveCoach.fulfilled]: (state, action) => {
      if (action.payload) {
        state?.allCoaches?.forEach((coach) => {
          if (coach.username === action.payload) {
            coach.profileStatus = true;
          }
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = coachSlice.actions;

export default coachSlice;
