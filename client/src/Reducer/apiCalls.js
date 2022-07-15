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
  try {
    const res = await axios.get(`http://localhost:5000/posts?page=${page}`);
    console.log(res.data);
    dispatch(getPosts(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (dispatch, id, post) => {
  try {
    const res = await axios.patch(`http://localhost:5000/posts/${id}`, post);
    console.log(res.data);
    dispatch(fetchUpdatePost(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (dispatch, id) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/posts/${id}/deletePost`
    );
    console.log(res);
    dispatch(fetchDeletePost(id));
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (dispatch, post) => {
  try {
    const res = await axios.post(`http://localhost:5000/posts`, post);
    console.log(res);
    dispatch(createPost(post));
  } catch (error) {
    console.log(error);
  }
};
