import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, fetchAllPosts } from "../Reducer/apiCalls";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
const Container = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  ul {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    list-style: none;

    li {
      flex: 2;
      border: 1px solid blue;
      padding: 5px;
      cursor: pointer;
      text-align: center;

      &.selected {
        background-color: #c9c9f2;
      }
    }

    .pagination {
      flex: 1;
    }
  }
`;
const CreatePost = styled.div`
  width: 100%;
  padding: 20px;
  height: 70px;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    text-decoration: none;
    background-color: #7373ec;
    border-radius: 20px;
    color: white;
    padding: 10px 20px;
    outline: none;
    border: none;
  }
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  border-collapse: collapse;
  td,
  th {
    padding: 10px;
    border: 1px solid lightblue;
    text-align: center;
  }

  tbody {
    .delete {
      padding: 10px 40px;
      background-color: #ed6e6e;
      color: white;
      border: none;
      oueline: none;
      border-radius: 5px;
    }

    .edit {
      padding: 8px 40px;
      background-color: #7373ec;
      color: white;
      border: none;
      oueline: none;
      border-radius: 5px;
      text-decoration: none;
    }
  }
`;

const Pagination = styled.div``;
const Home = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(true);
  const { posts, numberOfPage, currentPage } = useSelector(
    (state) => state.post
  );
  console.log(numberOfPage);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    fetchAllPosts(dispatch, 1);
  }, []);

  const handleDelete = (p) => {
    if (!user) {
      alert("please login");
    } else {
      if (p.creatorId === user._id) {
        deletePost(dispatch, p._id);
      } else {
        alert("you cannot delete this post");
      }
    }
  };
  const handlePageClick = (data) => {
    console.log(data);
    fetchAllPosts(dispatch, data.selected + 1);
  };
  return (
    <Container>
      <Wrapper>
        <CreatePost>
          <Link to={"/posts/createPost"}>
            <button disabled={user ? false : true}>Create Post</button>
          </Link>
        </CreatePost>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Messsage</th>
              <th>Name</th>
              <th colSpan='2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>
                  <Link to={`/${p._id}`}>{p._id}</Link>
                </td>
                <td>{p.title}</td>
                <td>{p.message}</td>
                <td>{p.name}</td>
                <td>
                  <Link
                    to={p.creatorId === user?._id && `/posts/${p._id}`}
                    className='edit'
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(p)} className='delete'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={numberOfPage}
          previousLabel='< previous'
          pageClassName='pagination'
        />
      </Wrapper>
    </Container>
  );
};

export default Home;
