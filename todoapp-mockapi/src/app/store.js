import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/auth/userSlice";
import taskReducer from "../features/task/taskSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    task: taskReducer,
  },
});
