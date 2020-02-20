import { useMutation } from "@apollo/react-hooks";

import { deletePostMutation } from "../../queries/deletePost";

import { useDispatch } from "react-redux";

export const DELETE_POST = "DELETE_POST";

export const useDeletePost = () => {
  const dispatch = useDispatch();

  const [deletePost] = useMutation(deletePostMutation);

  const deletePostAction = id => {
    console.log(id);
    dispatch({ type: DELETE_POST, payload: id });
    deletePost({
      variables: {
        id: id
      }
    });
  };
  return [deletePostAction, deletePost];
};
