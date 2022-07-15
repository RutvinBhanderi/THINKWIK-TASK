import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Load = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid blue;
  border-bottom: none;
  animation: loading 0.3s linear infinite;

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Loader = () => {
  return (
    <Container>
      <Load />
    </Container>
  );
};

export default Loader;
