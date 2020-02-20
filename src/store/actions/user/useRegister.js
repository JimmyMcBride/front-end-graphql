import { registerUserMutation } from "../queries/registerUser";

import { useMutation } from "@apollo/react-hooks";

import { useDispatch } from "react-redux";

export const REGISTER_USER = "REGISTER_USER";

export const getUser = () => {
  const dispatch = useDispatch();

  const [register, { data, loading, error }] = useMutation(
    registerUserMutation
  );

  const registerInfo = {
    loading,
    data,
    error
  };

  const registerUserAction = id => {
    register({
      variables: {
        id: id
      }
    });
    dispatch({
      type: REGISTER_USER,
      payload: {
        data,
        loading,
        error
      }
    });
  };

  return [registerUserAction, registerInfo];
};
