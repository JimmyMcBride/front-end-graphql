import React from "react";

import { Card, Input, Button } from "bushido-strap";

import { addCommentMutation } from "./Queries/addComment";

import { useMutation } from "@apollo/react-hooks";

import { useInputChange } from "../../../hooks/useInputChange";

import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

export default function AddComment({ post_id }) {
  const [addComment] = useMutation(addCommentMutation);

  const [input, handleInputChange] = useInputChange();

  const { uid } = useSelector(state => state.firebase.auth);

  const handleAddComment = e => {
    e.preventDefault();
    addComment({
      variables: {
        id: uuidv4(),
        body: input.body,
        user_id: uid,
        post_id: post_id
      }
    });
  };

  return (
    <Card stretch>
      <strong>Add a comment!</strong>
      <Input
        type="text"
        name="body"
        placeholder="Comment here..."
        onChange={handleInputChange}
        stretch
      />
      <Button onClick={handleAddComment} purple stretch>
        Submit
      </Button>
    </Card>
  );
}
