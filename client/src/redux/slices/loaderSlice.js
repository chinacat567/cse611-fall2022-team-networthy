import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loaderVisible: false,
  },
  reducers: {
    showLoader: (state, action) => {
      state.loaderVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader } = loaderSlice.actions;

export default loaderSlice;
