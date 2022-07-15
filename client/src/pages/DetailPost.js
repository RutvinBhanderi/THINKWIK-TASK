import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const Conatiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 50%;
  box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  padding: 20px;
  position: relative;
`;

const Creator = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  color: orange;

  span {
    color: gray;
  }
`;
const Title = styled.h1``;
const DetailPost = () => {
  const params = useParams();
  const post = useSelector((state) =>
    state.post.posts.find((p) => p._id === params.id)
  );
  console.log(post);
  return (
    post && (
      <Conatiner>
        <Wrapper>
          <Creator>
            <span>CreatorId : </span>
            {post._id}
          </Creator>
          <Title>Title : {post.title}</Title>
          <p>Description : {post.message}</p>
          <p>Name : {post.name}</p>
        </Wrapper>
      </Conatiner>
    )
  );
};

export default DetailPost;
