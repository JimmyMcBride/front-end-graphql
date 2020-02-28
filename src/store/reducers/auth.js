import {
  GET_USER,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GOOGLE_REGISTER_SUCCESS,
  GET_USER_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_POST_FEED,
} from "../types";

const initialState = {
  loggingIn: false,
  isLoggedIn: false,
  loggingOut: false,
  registering: false,
  isRegistered: false,
  user: [],
  posts: [],
  post_feed: [],
  error: "",
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        isRegistered: true,
        user: {
          id: action.payload.register.id,
          username: action.payload.register.username,
          email: action.payload.register.email,
          img_url: action.payload.register.img_url,
        },
        error: "",
      };

    case GOOGLE_REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.register.id,
          username: action.payload.register.username,
          email: action.payload.register.email,
          img_url: action.payload.register.img_url,
        },
      };

    case GET_USER:
      return {
        ...state,
        user: {
          id: action.payload?.user.id,
          username: action.payload?.user.username,
          email: action.payload?.user.email,
          img_url: action.payload?.user.img_url,
        },
      };

    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload?.map(post => post),
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload.addPost],
        post_feed: [...state.post_feed, action.payload.addPost],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };

    case GET_POST_FEED:
      return {
        ...state,
        post_feed: action.payload,
      };

    // return default state in case the case doesn't match any of our cases
    default:
      return state;
  }
};
