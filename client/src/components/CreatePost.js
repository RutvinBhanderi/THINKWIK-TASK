import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addPost, updatePost } from "../Reducer/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userSlice from "../Reducer/userSlice";
const Conatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px;
`;
const Wrapper = styled.div`
  width: 60%;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 10px;
    border: 1px solid gray;
    outline: none;
  }
`;
const Title = styled.h3``;
const CreatePost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    name: "",
  });
  const { user } = useSelector((state) => state.user);
  const post = useSelector((state) =>
    params.id ? state.post.posts.find((p) => p._id === params.id) : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      updatePost(dispatch, params.id, { ...formData, creatorId: user._id });
    } else {
      addPost(dispatch, { ...formData, creatorId: user._id });
    }
    setFormData({
      title: "",
      message: "",
      name: "",
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        message: post.message,
        name: post.name,
      });
    }
  }, [params.id]);

  return (
    <Conatiner>
      <Wrapper>
        <Title>{params.id ? "update post" : "create post"}</Title>
        <Form onSubmit={handleSubmit}>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type='text'
            name='message'
            value={formData.message}
            onChange={handleChange}
          />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <button>Submit</button>
        </Form>
      </Wrapper>
    </Conatiner>
  );
};

export default CreatePost;
