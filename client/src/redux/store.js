import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";
import loaderSlice from "./slices/loaderSlice";

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
    loader: loaderSlice.reducer,
  },
});
