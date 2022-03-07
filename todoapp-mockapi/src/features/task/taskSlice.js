import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { taskService } from "../../services/TaskService";
import _ from "lodash";
// First, create the thunk
export const fetchListTaskByUser = createAsyncThunk(
  "GET_LIST_TASK",
  async (status) => {
    const userLogin = localStorage.getItem("userLogin");
    const response = await taskService.getAllTask(
      +JSON.parse(userLogin).id,
      status
    );
    return response.data;
  }
);

export const fetchAddTaskByUser = createAsyncThunk(
  "ADD_TASK",
  async (formData) => {
    const userLogin = localStorage.getItem("userLogin");
    const response = await taskService.addTask(
      +JSON.parse(userLogin).id,
      formData
    );
    return response.data;
  }
);

export const fetchDeleteTaskByUser = createAsyncThunk(
  "DELETE_TASK",
  async (idTask) => {
    const userLogin = localStorage.getItem("userLogin");
    const response = await taskService.deteleTask(
      +JSON.parse(userLogin).id,
      idTask
    );
    return response.data;
  }
);

export const fetchUpdateTaskByUser = createAsyncThunk(
  "UPDATE_TASK_USER",
  async (formData) => {
    const userLogin = localStorage.getItem("userLogin");
    const response = await taskService.updateTask(
      +JSON.parse(userLogin).id,
      formData.id,
      formData
    );
    return response.data;
  }
);

const initialState = {
  arrTask: [],
  error: null,
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get list task by user
    builder
      .addCase(fetchListTaskByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchListTaskByUser.fulfilled, (state, action) => {
        state.arrTask = action.payload;
        state.loading = false;
      })
      .addCase(fetchListTaskByUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      /// ADD_TASK
      .addCase(fetchAddTaskByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAddTaskByUser.fulfilled, (state, action) => {
        state.arrTask.push(action.payload);
        state.loading = false;
      })
      .addCase(fetchAddTaskByUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })

      /////DELETE_TASK
      .addCase(fetchDeleteTaskByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteTaskByUser.fulfilled, (state, action) => {
        state.arrTask = state.arrTask.filter(
          (item) => item.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(fetchDeleteTaskByUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      /// UPDATE_TASK_USER
      .addCase(fetchUpdateTaskByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUpdateTaskByUser.fulfilled, (state, action) => {
        state.arrTask[action.payload.id] = action.payload;
        state.loading = false;
      })
      .addCase(fetchUpdateTaskByUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});
export default taskSlice.reducer;
