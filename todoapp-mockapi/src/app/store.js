import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/auth/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
