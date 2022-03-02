import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/AuthService";
// First, create the thunk
export const fetchListUser = createAsyncThunk("GET_LIST_USER", async () => {
  const response = await authService.getListUser();
  return response.data;
});
export const fetchSignUpUser = createAsyncThunk("SIGN_UP", async (data) => {
  const response = await authService.signUp(data);
  console.log(response.data);
  return response.data;
});
const initialState = {
  arrUser: [],
  error: null,
  loading: false,
  userLogin: JSON.parse(localStorage.getItem("userLogin")) ?? {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log(action);
      state.userLogin = action.payload;
      localStorage.setItem("userLogin", JSON.stringify(state.userLogin));
    },
    logOut: (state, action) => {
      state.userLogin = {};
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchListUser.fulfilled, (state, action) => {
        state.arrUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchListUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      // SIGN UP
      .addCase(fetchSignUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSignUpUser.fulfilled, (state, action) => {
        //state.arrUser = action.payload;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchSignUpUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { signIn, logOut } = userSlice.actions;
export default userSlice.reducer;
