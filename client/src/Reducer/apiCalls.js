import {
  loginError,
  loginStart,
  loginSuccess,
  registerError,
  registerStart,
  registerSuccess,
} from "./userSlice";
import {
  createPost,
  fetchDeletePost,
  fetchUpdatePost,
  getPosts,
  fetchFailure,
  fetchStart,
  fetchSuccess,
} from "./postSlice";
import axios from "axios";

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginError());
  }
};

export const register = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:5000/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(registerError());
  }
};

export const fetchAllPosts = async (dispatch, page) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get(`http://localhost:5000/posts?page=${page}`);
    console.log(res.data);
    dispatch(getPosts(res.data));
    dispatch(fetchSuccess());
  } catch (error) {
    dispatch(fetchFailure());
    console.log(error);
  }
};

export const updatePost = async (dispatch, id, post) => {
  dispatch(fetchStart());
  try {
    const res = await axios.patch(
      `http://localhost:5000/posts/${id}/updatePost`,
      post
    );
    console.log(res.data);
    dispatch(fetchUpdatePost(res.data));
    dispatch(fetchSuccess());
  } catch (error) {
    console.log(error);
    dispatch(fetchFailure());
  }
};

export const deletePost = async (dispatch, id) => {
  dispatch(fetchStart());
  try {
    const res = await axios.delete(
      `http://localhost:5000/posts/${id}/deletePost`
    );
    console.log(res);
    dispatch(fetchDeletePost(id));
    dispatch(fetchSuccess());
  } catch (error) {
    console.log(error);
    dispatch(fetchFailure());
  }
};

export const addPost = async (dispatch, post) => {
  dispatch(fetchStart());
  setTimeout(async () => {
    try {
      const res = await axios.post(`http://localhost:5000/posts`, post);
      console.log(res);
      dispatch(createPost(post));
      dispatch(fetchSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchFailure());
    }
  }, 3000);
};
