import React from "react";

import { Wrapper, Linkton, Row, Box, Card } from "bushido-strap";

import { useQuery } from "@apollo/react-hooks";
import { getPostsQuery } from "./Queries/getPosts";

import { useHistory } from "react-router-dom";

import Nav from "../../components/Nav";

export default function Posts() {
  const { data, loading } = useQuery(getPostsQuery);

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
            data?.posts?.map(item => (
              <Card stretch key={item.id}>
                <Row stretch ai_center>
                  <Box sqr="3rem" circle>
                    <img src={item.user.img_url} alt="user profile" />
                  </Box>
                  <Box w="2rem" />
                  <strong>{item.user.username}</strong>
                </Row>
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
