import { getUserPostsQuery } from "../queries/getUserPosts";

import { useQuery } from "@apollo/react-hooks";

// import { useDispatch } from "";

export const GET_USER = "GET_USER";

export const getUserPosts = () => {
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
