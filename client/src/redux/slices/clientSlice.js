import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../../services/userService";

export const getAllClients = createAsyncThunk(
  "client/getAllClients",
  async () => {
    return await userService._getAllClients();
  }
);

export const deleteClientProfile = createAsyncThunk(
  "client/deleteClientProfile",
  async (payload) => {
    return await userService._deleteClientProfile(payload);
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
    [deleteClientProfile.fulfilled]: (state, action) => {
      if (action.payload) {
        state.allClients = state.allClients.filter(
          (x) => x?.clientProfile?.username !== action.payload
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = clientSlice.actions;

export default clientSlice;
