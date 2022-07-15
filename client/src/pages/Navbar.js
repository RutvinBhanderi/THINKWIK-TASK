import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducer/userSlice";
const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 40px;
  background-color: #2c2c2c;
  color: white;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  height: 100%;

  a {
    border: none;
    padding: 8px 40px;
    border-radius: 5px;
    background-color: #fcaa62;
    color: white;
    cursor: pointer;
    text-decoration: none;
    display:grid:
    place-items:center;
  }
`;
const Email = styled.h5`
  margin: 0;
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
    }
  };
  return (
    <Container>
      <Wrapper>
        <Email>{user && user.email}</Email>
        <Link to='/login' onClick={handleLogout}>
          {user ? "Logout" : "Login"}
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
