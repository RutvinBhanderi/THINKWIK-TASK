import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login, register } from "../Reducer/apiCalls";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 400px;
  height: auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);

  & > p {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 30px;
  input {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid gray;
    width: 100%;
  }

  button {
    padding: 10px;
    width: 100%;
    border: none;
    outline: none;
    background-color: #fcaa62;
    color: white;
    font-size: 20px;
    font-weight: 100;
    border-radius: 5px;
  }
`;
const Login = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleForm = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loggedIn) {
      if (!formData.email || !formData.password) {
        alert("all fields are required");
      } else {
        login(dispatch, formData, navigate);
      }
    } else {
      if (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.mobile
      ) {
        alert("all fields are required");
      } else {
        register(dispatch, formData, navigate);
      }
    }
  };
  console.log(formData);
  return (
    <Container className='Login'>
      <Wrapper>
        <Title>{loggedIn ? "Login" : "Register"}</Title>
        <Form onSubmit={handleSubmit}>
          {!loggedIn && (
            <input
              name='username'
              type='text'
              placeholder='Username'
              onChange={handleForm}
              value={formData.username}
            />
          )}
          <input
            name='email'
            type='email'
            placeholder='email'
            onChange={handleForm}
            value={formData.email}
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={handleForm}
            value={formData.password}
          />
          {!loggedIn && (
            <>
              <input
                name='confirmPassword'
                type='password'
                placeholder='confirmPassword'
                onChange={handleForm}
                value={formData.confirmPassword}
              />
              <input
                name='mobile'
                type='number'
                placeholder='mobile'
                onChange={handleForm}
                value={formData.mobile}
              />
            </>
          )}
          <button>{loggedIn ? "Login" : "Register"}</button>
        </Form>
        <p
          onClick={() => {
            setLoggedIn(!loggedIn);
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobile: "",
            });
          }}
        >
          {loggedIn ? "Don't have an account" : "Already have an account"}
        </p>
      </Wrapper>
    </Container>
  );
};

export default Login;
