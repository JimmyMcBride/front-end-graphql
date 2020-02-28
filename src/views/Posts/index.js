import React, { useEffect } from "react";

import { Wrapper, Linkton, Flex, Box, Card } from "bushido-strap";

import { useQuery } from "@apollo/react-hooks";
import { getPostsQuery } from "./queries/getPosts";

import { GET_POST_FEED } from "../../store/types";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/Nav";

export default function Posts() {
  const { data, loading } = useQuery(getPostsQuery);

  const { post_feed } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_POST_FEED, payload: data?.posts });
  }, [dispatch, data]);

  const history = useHistory();

  return (
    <Wrapper>
      <Nav />
      <Box>
        <Box h="2rem" />
        <Card invert stretch>
          <Linkton to="/" pink="true" stretch="true">
            Go to your dashboard
          </Linkton>
        </Card>

        <Box h="1rem" />
        <Card invert max_w="50vw">
          {loading ? (
            <Card invert>
              <h6>Loading...</h6>
            </Card>
          ) : (
            post_feed?.map(item => (
              <Card stretch key={item.id}>
                <Flex stretch ai_center>
                  <Box sqr="3rem" circle>
                    <img src={item.user.img_url} alt="user profile" />
                  </Box>
                  <Box w="2rem" />
                  <strong>{item.user.username}</strong>
                </Flex>
                <Card
                  invert
                  stretch
                  key={item.id}
                  onClick={() => history.push(`/posts/${item.id}`)}
                >
                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                </Card>
              </Card>
            ))
          )}
        </Card>
      </Box>
    </Wrapper>
  );
}
