import { getUserPostsQuery } from "../queries/getUserPosts";

import { useQuery } from "@apollo/react-hooks";

import { useDispatch } from "react-redux";

export const GET_USER = "GET_USER";

export const useGetUserPosts = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(getUserPostsQuery);

  const getUserPostsAction = () => {
    dispatch({
      type: GET_USER,
      payload: {
        data,
        loading,
        error
      }
    });
  };
};
