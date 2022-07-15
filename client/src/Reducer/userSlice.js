import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    loginError: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },

    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload.user;
    },
    registerError: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginError,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
