import React from "react";

import { Form, Input, Button, Card, Box } from "bushido-strap";

import { useMutation } from "@apollo/react-hooks";

import { useInputChange } from "../../../../hooks/useInputChange";

import { addPostMutation } from "./queries/addPost";

import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import PostResponse from "./components/PostResponse";
import { ADD_POST } from "../../../../store/types";

export default function Login() {
  const dispatch = useDispatch();
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
        user_id: uid,
      },
    }).then(res => dispatch({ type: ADD_POST, payload: res.data }));
  };

  const response = data?.addPost;

  console.log("ADD POST RESPONSE", response);

  return (
    <Card invert stretch>
      <Form onSubmit={handleAddPost}>
        {/* <Card p="4rem" jc_evenly stretch> */}
        <Card p="4rem">
          <Input
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleInputChange}
          />
          <Box h="2rem" />
          <Input
            name="body"
            type="text"
            placeholder="Type the body of your post here..."
            onChange={handleInputChange}
          />
          <Box h="2rem" />
          <Button stretch type="submit" blue>
            Add Post!
          </Button>
          {data?.addPost?.response ? (
            <PostResponse response={response} />
          ) : null}
        </Card>
      </Form>
    </Card>
  );
}
