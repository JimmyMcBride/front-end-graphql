import { GET_USER } from "../actions/users";

const initialState = {
  users: [],
  loading: false,
  error: null
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload?.users,
        loading: action.payload,
        error: action.payload
      };
    default:
      return state;
  }
};
