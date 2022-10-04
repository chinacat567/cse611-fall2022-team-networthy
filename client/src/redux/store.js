import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/testSlice";

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
