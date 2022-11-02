import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../../services/userService";

export const getAllClients = createAsyncThunk(
  "coach/getAllClients",
  async () => {
    return await userService._getAllClients();
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    allClients: [],
  },
  reducers: {},
  extraReducers: {
    [getAllClients.fulfilled]: (state, action) => {
      state.allClients = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = clientSlice.actions;

export default clientSlice;
