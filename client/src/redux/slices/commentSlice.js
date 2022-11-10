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
    [getClientComments.fullfilled]: (state, action) => {
      state.clientComments = action?.payload || [];
    },
    [addClientComments.fullfilled]: (state, action) => {
      if (action.payload) {
        state.clientComments.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = commentSlice.actions;

export default commentSlice;
