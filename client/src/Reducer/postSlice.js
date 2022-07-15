import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isFetching: false,
    error: false,
    currentPage: 1,
    numberOfPage: 1,
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.currentPage = action.payload.currentPage;
      state.numberOfPage = action.payload.totalPages;
    },
    fetchUpdatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    fetchDeletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    fetchSuccess: (state) => {
      state.isFetching = false;
    },
    fetchStart: (state) => {
      state.isFetching = true;
    },
    fetchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPosts,
  fetchUpdatePost,
  fetchDeletePost,
  createPost,
  fetchSuccess,
  fetchStart,
  fetchFailure,
} = postSlice.actions;

export default postSlice.reducer;
