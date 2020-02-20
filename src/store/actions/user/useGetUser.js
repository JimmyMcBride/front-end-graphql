import { getUserQuery } from "../queries/getUser";

import { useQuery } from "@apollo/react-hooks";

export const GET_USER = "GET_USER";

export const getUser = () => {
  const { loading, data, error } = useQuery(getUserQuery);

  return dispatch => {
    dispatch({
      type: GET_USER,
      payload: {
        data,
        status: loading,
        error: error
      }
    });
  };
};
