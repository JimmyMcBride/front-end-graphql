import React from "react";

import {
  Wrapper,
  Form,
  Input,
  Button,
  Card,
  Linkton,
  Box,
  Col
} from "bushido-strap";

import { useMutation } from "@apollo/react-hooks";

import { useInputChange } from "../../hooks/useInputChange";

import { addPostMutation } from "./Queries/addPost";

import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import PostResponse from "./components/PostResponse";
import Nav from "../../components/Nav";

export default function Login() {
  const { uid } = useSelector(state => state.firebase.auth);

  const [addPost, { data }] = useMutation(addPostMutation);

  const [input, handleInputChange] = useInputChange();

  const handleAddPost = e => {
    e.preventDefault();
    addPost({
      variables: {
        id: uuidv4(),
        title: input.title,
        body: input.body,
        user_id: uid
      }
    });
  };

  const response = data?.addPost?.response;

  console.log(response);

  return (
    <Wrapper>
      <Nav />
      <Box h="2rem" />
      <Card>
        <Card invert stretch>
          <Linkton to="/" pink="true" stretch="true">
            Go Home
          </Linkton>
        </Card>
        <Form onSubmit={handleAddPost}>
          <Card invert p="4rem" jc_evenly>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              onChange={handleInputChange}
            />
            <Input
              name="body"
              type="text"
              placeholder="Type the body of your post here..."
              onChange={handleInputChange}
            />
            <Button stretch type="submit" blue>
              Add Post!
            </Button>
            {data?.addPost?.response ? (
              <PostResponse response={response} />
            ) : null}
          </Card>
        </Form>
      </Card>
    </Wrapper>
  );
}
