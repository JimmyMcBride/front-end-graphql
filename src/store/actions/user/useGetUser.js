import { getUserQuery } from "../../queries/getUser";

import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";

export const GET_USER = "GET_USER";

export const useGetUser = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(getUserQuery);

  const userInfo = {
    data: data,
    loading: loading,
    error: error,
  };

  const getUser = () => {
    dispatch({
      type: GET_USER,
      payload: {
        data,
        status: loading,
        error: error,
      },
    });
  };
  return [userInfo, getUser];
};
