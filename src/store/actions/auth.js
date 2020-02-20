// import { registerUserMutation } from "../_queries/registerUser";

// import { useMutation } from "@apollo/react-hooks";

import firebase from "../../config/firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const login = (email, password) => dispatch => {
  dispatch({ type: "LOGIN_START" });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      dispatch({ type: "LOGIN_SUCCESS" });
      console.log("Login response:", res);
    })
    .catch(err => {
      dispatch({ type: "LOGIN_ERROR", payload: err.message });
      alert(err.message);
    });
};

export const register = (email, password, username, img_url) => dispatch => {
  // const [register, { data }] = useMutation(registerUserMutation);
  dispatch({ type: "REGISTER_START" });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // register({
      //   variables: {
      //     username: username,
      //     email: email,
      //     img_url: img_url,
      //     password: password
      //   }
      // }).then(res => {
      //   dispatch({ type: "GQL_REG_SUCCESS", payload: res.data });
      // });
      dispatch({ type: "REGISTER_SUCCESS" });
    })
    .catch(err => {
      dispatch({ type: "REGISTER_ERROR", payload: err.message });
      alert(err.message);
    });
};

export const logout = () => dispatch => {
  dispatch({ type: "LOGOUT_START" });
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "LOGOUT_SUCCESS" });
    })
    .catch(err => {
      dispatch({ type: "LOGOUT_ERROR", payload: err.message });
      alert(err.message);
    });
};

export const googleLogin = () => dispatch => {
  dispatch({ type: "GOOGLE_LOGIN_START" });
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(res => {
      // google login response
      console.log("Google response:", res);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = res.credential.accessToken;

      console.log("Token:", token);

      // The signed-in user info.
      const user = res.user.displayName;
      // const email = res.user.email;
      const userPicture = res.additionalUserInfo.profile.picture;

      console.log("User:", user);
      console.log("Picture:", userPicture);

      // ...
      dispatch({ type: "GOOGLE_LOGIN_SUCCESS" });
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("Error code:", errorCode);

      const errorMessage = error.message;
      console.log("Error message:", errorMessage);

      // The email of the user's account used.
      const email = error.email;
      console.log("email:", email);

      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log("Credential:", credential);

      // ...
      dispatch({ type: "GOOGLE_LOGIN_FAILURE" });
    });
};

export const googleRegister = () => dispatch => {
  // const [register, { data }] = useMutation(registerUserMutation);
  dispatch({
    type: "GOOGLE_REGISTER_START"
  });
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(res => {
      // google login response
      console.log("Google response:", res);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = res.credential.accessToken;
      console.log("Token:", token);
      // The signed-in user info.
      const user = res.user.displayName;
      // const email = res.user.email;
      const userPicture = res.additionalUserInfo.profile.picture;
      console.log("User:", user);
      console.log("Picture:", userPicture);
      // ...
      // register({
      //   variables: {
      //     username: user,
      //     email: email,
      //     img_url: userPicture
      //   }
      // }).then(res => {
      //   dispatch({ type: "GOOGLE_GQL_REG_SUCCESS", payload: res.data });
      // });
      dispatch({
        type: "GOOGLE_REGISTER_SUCCESS"
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("Error code:", errorCode);
      const errorMessage = error.message;
      console.log("Error message:", errorMessage);
      // The email of the user's account used.
      const email = error.email;
      console.log("email:", email);
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log("Credential:", credential);
      // ...
      dispatch({
        type: "GOOGLE_REGISTER_FAILURE"
      });
    });
};
