import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../../services/commentService";

export const getClientComments = createAsyncThunk(
  "comment/getClientComments",
  async (payload) => {
    return await commentService._getClientComments(payload);
  }
);

export const addClientComments = createAsyncThunk(
  "comment/addClientComments",
  async (payload) => {
    return await commentService._addClientComments(payload);
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    clientComments: [],
  },
  reducers: {},
  extraReducers: {
    [getClientComments.fulfilled]: (state, action) => {
      state.clientComments = action?.payload?.reverse() || [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = commentSlice.actions;

export default commentSlice;
