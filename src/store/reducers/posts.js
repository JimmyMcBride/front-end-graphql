// import {  } from "../types";

const initialState = {
  user_posts: [],
  post_feed: [],
  loading: false,
  error: null,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    // case GET_USER:
    //   return {
    //     ...state,
    //     users: action.payload?.users,
    //     loading: action.payload,
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};
