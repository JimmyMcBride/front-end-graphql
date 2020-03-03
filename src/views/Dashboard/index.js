import React, { useEffect, useState } from "react";

import {
  Wrapper,
  Box,
  Card,
  Linkton,
  Flex,
  Button,
  theme,
} from "bushido-strap";

import { useSelector, useDispatch } from "react-redux";

import { useQuery, useMutation } from "@apollo/react-hooks";

import { getUserPostsQuery } from "./queries/getUserPosts";

import { deletePostMutation } from "./queries/deletePost";

import Nav from "../../components/Nav";
import AddPost from "./components/AddPost";

import { GET_USER_POSTS, DELETE_POST } from "../../store/types";

export default function Dashboard() {
  const dispatch = useDispatch();

  const [formStatus, setFormStatus] = useState(false);

  const { uid } = useSelector(state => state.firebase.auth);

  const { posts } = useSelector(state => state.auth);

  const [deletePost] = useMutation(deletePostMutation);

  const { data, loading } = useQuery(getUserPostsQuery, {
    variables: {
      id: uid,
    },
  });
  useEffect(() => {
    dispatch({ type: GET_USER_POSTS, payload: data?.user?.posts });
    console.log(data?.user?.posts);
  }, [data, dispatch]);

  const handleForm = e => {
    e.preventDefault();
    setFormStatus(!formStatus);
  };

  return (
    <Wrapper>
      <Nav />
      <Box h="2rem" />
      <Flex drape w="50rem">
        <Card invert stretch>
          <Linkton to="/posts" teal="true" stretch="true">
            View the post feed!
          </Linkton>
          <Button onClick={handleForm} pink="true" stretch="true">
            Add a new post!
          </Button>
        </Card>

        {formStatus ? <AddPost /> : null}

        <Card invert stretch>
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
                      deletePost({
                        variables: {
                          id: item.id,
                        },
                      }).then(res => {
                        console.log("DELETE POST RESPONSE", res);
                        dispatch({
                          type: DELETE_POST,
                          payload: res.data.deletePost,
                        });
                      });
                    }}
                  >
                    Delete Post
                  </Button>
                </Card>
              </Card>
            ))
          )}
        </Card>
      </Flex>
    </Wrapper>
  );
}
