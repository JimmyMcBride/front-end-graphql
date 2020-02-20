import React, { useReducer, useEffect } from "react";

import { Wrapper, Box, Card, Linkton, Col, Button, theme } from "bushido-strap";

import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/react-hooks";
import { getUserPostsQuery } from "../../store/queries/getUserPosts";

import { useDeletePost } from "../../store/actions/post/useDeletePost";

// import UserPosts from "./components/UserPosts";
import Nav from "../../components/Nav";

import { getUser } from "../../store/actions/user/useGetUser";

const initialState = { posts: [] };

export const DELETE_POST = "@delete/userPost";

function reducer(state, action) {
  switch (action?.type) {
    case "@get/userPosts":
      return {
        posts: action.payload
      };
    case DELETE_POST:
      return {
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      throw new Error();
  }
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const dispatch = useDispatch();

  const { posts, isDeleted } = state;

  const { uid } = useSelector(state => state.firebase.auth);

  const [deletePost, handleDeletePost] = useDeletePost();

  const { data, loading } = useQuery(getUserPostsQuery, {
    variables: {
      id: uid
    }
  });

  useEffect(() => {
    dispatch({ type: "@get/userPosts", payload: data?.user?.posts });
    console.log(data?.user?.posts);
  }, [dispatch, data]);

  // useEffect(() => {
  //   dispatch(getUser);
  // }, [useDispatch]);

  // console.log(deletePost?.response);

  return (
    <Wrapper>
      <Nav />
      <Box h="2rem" />
      <Col>
        <Card invert stretch>
          <Linkton to="/posts" teal="true" stretch="true">
            View the post feed!
          </Linkton>
          <Linkton to="/add_post" pink="true" stretch="true">
            Add a new post!
          </Linkton>
        </Card>
        {/* <UserPosts
          posts={posts}
          loading={loading}
          dispatch={() => dispatch()}
        /> */}
        <Card invert max_w="50vw">
          {loading ? (
            <Card>
              <h6>Loading...</h6>
            </Card>
          ) : !loading && posts?.length === 0 ? (
            <Card>
              <h3>No posts yet...</h3>
            </Card>
          ) : (
            posts?.map(item => (
              <Card stretch key={item.id}>
                <Card bg={theme.blackAlpha7} stretch>
                  <Card stretch>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Card>
                </Card>
                <Card row stretch jc_between invert>
                  <Button orange w="65%">
                    Update Post
                  </Button>

                  <Button
                    red
                    w="30%"
                    onClick={e => {
                      e.preventDefault();
                      console.log(item.id);
                      handleDeletePost(item.id);
                      // dispatch({
                      //   type: DELETE_POST,
                      //   payload: item.id
                      // });
                    }}
                  >
                    Delete Post
                  </Button>
                </Card>
              </Card>
            ))
          )}
        </Card>
      </Col>
    </Wrapper>
  );
}
