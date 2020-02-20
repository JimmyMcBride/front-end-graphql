import React, { useState, useEffect } from "react";

import { Wrapper, Linkton, Row, Box, Card } from "bushido-strap";

import { useQuery } from "@apollo/react-hooks";
import { getPostQuery } from "./Queries/getPost";

import { useParams } from "react-router-dom";

import AddComment from "./components/AddComment";

export default function Posts() {
  const { id } = useParams();

  const { data, loading } = useQuery(getPostQuery, {
    variables: {
      id: id
    }
  });

  const [user, setUser] = useState({
    id: "",
    title: "",
    body: ""
  });

  const [post, setPost] = useState({
    username: "",
    img_url: ""
  });

  const [comments, setComments] = useState({
    id: "",
    body: "",
    username: "",
    img_url: ""
  });

  useEffect(() => {
    setPost({
      id: data?.post?.id,
      title: data?.post?.title,
      body: data?.post?.body
    });

    setUser({
      username: data?.post?.user?.username,
      img_url: data?.post?.user?.img_url
    });

    setComments(
      data?.post?.comments.map(comment => {
        return {
          id: comment?.id,
          body: comment?.body,
          username: comment?.user?.username,
          img_url: comment?.user?.img_url
        };
      })
    );
  }, [data]);

  console.log("User: ", user);
  console.log("Post: ", post);
  console.log("Comments: ", comments);

  return (
    <Wrapper>
      <Card invert w="50vw">
        <Linkton to="/" stretch="true" blue="true">
          Go to your dashboard
        </Linkton>
        <Linkton to="/posts" stretch="true" teal="true">
          Go back to posts
        </Linkton>
      </Card>
      <Card invert w="50vw">
        {loading ? (
          <Card invert>
            <Card>
              <h6>Loading...</h6>
            </Card>
          </Card>
        ) : (
          <Card stretch key={post?.id}>
            <Row stretch ai_center>
              <Box sqr="3rem" circle>
                <img src={user?.img_url} alt="user profile" />
              </Box>
              <Box w="2rem" />
              <strong>{user?.username}</strong>
            </Row>
            <Card invert stretch key={post?.title}>
              <h6>{post?.title}</h6>
              <p>{post?.body}</p>
            </Card>
            {console.log(comments?.length)}
            {comments?.length >= 1 ? (
              <Card stretch>
                {comments?.map(comment => (
                  <Card invert stretch key={comment.id}>
                    {console.log(comments)}
                    <Row stretch ai_center>
                      <Box sqr="3rem" circle>
                        <img src={comment.img_url} alt="user profile" />
                      </Box>
                      <Box w="1rem" />
                      <b>{comment.username}</b>
                    </Row>
                    <Card stretch ai_start>
                      <p>{comment.body}</p>
                    </Card>
                  </Card>
                ))}
              </Card>
            ) : (
              <Card>
                <Card invert m="0">
                  No comments yet...
                </Card>
              </Card>
            )}
          </Card>
        )}
        <AddComment post_id={post?.id} />
      </Card>
    </Wrapper>
  );
}
