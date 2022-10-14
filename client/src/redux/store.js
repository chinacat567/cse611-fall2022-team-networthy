import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});
