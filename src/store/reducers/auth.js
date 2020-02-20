const initialState = {
  loggingIn: false,
  isLoggedIn: false,
  loggingOut: false,
  registering: false,
  isRegistered: false,
  error: ""
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    // login reducer
    case "LOGIN_START":
      return {
        ...state,
        loggingIn: true,
        isLoggedIn: false,
        error: null
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        error: null
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: false,
        error: "Login failed"
      };

    // register reducer
    case "REGISTER_START":
      return {
        ...state,
        registering: true,
        isRegistered: false,
        error: ""
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        registering: false,
        isRegistered: true,
        error: ""
      };

    case "REGISTER_FAILURE":
      return {
        ...state,
        registering: false,
        isRegistered: false,
        error: action.payload
      };

    // logout reducer
    case "LOGOUT_START":
      return {
        ...state,
        loggingOut: true
      };

    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loggingOut: false
      };

    case "LOGOUT_FAILURE":
      return {
        ...state,
        loggingOut: false
      };

    // google login reducer
    case "GOOGLE_LOGIN_START":
      return {
        ...state,
        loggingIn: true,
        error: null
      };
    case "GOOGLE_LOGIN_SUCCESS":
      return {
        ...state,
        loggingIn: true,
        error: null
      };
    case "GOOGLE_LOGIN_FAILURE":
      return {
        ...state,
        loggingIn: false
      };

    // return default state in case the case doesn't match any of our cases
    default:
      return state;
  }
};
