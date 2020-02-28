import React from "react";

import { Wrapper, Form, Input, Button, Card } from "bushido-strap";

import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";

import { useInputChange } from "../../../hooks/useInputChange";

import { registerUser } from "./queries/registerUser";

import {
  GOOGLE_REGISTER_SUCCESS,
  REGISTER_SUCCESS,
} from "../../../store/types";

import firebase from "../../../config/firebase";

import Loading from "../../../components/Loading";

import defaultPic from "../../../assets/images/default.png";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const dispatch = useDispatch();

  const [register] = useMutation(registerUser);

  const [input, handleInputChange] = useInputChange(registerUser);

  // once user logs in isLoggedIn will be true and route you to home page
  const isLoggedIn = useSelector(state => !state.firebase.auth.isEmpty);

  // If user is logged in on login page redirects them to protected route
  const loading = useSelector(state => state.firebase.isInitializing);

  if (isLoggedIn) return <Redirect to="/" />;

  if (loading) return <Loading />;

  const handleGoogleAuth = e => {
    e.preventDefault();
    dispatch({
      type: "GOOGLE_REGISTER_START",
    });
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(res => {
        // google login response
        console.log("Google response:", res);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = res.credential.accessToken;
        // console.log("Token:", token);
        // The signed-in user info.
        const id = res.user.uid;
        const user = res.user.displayName;
        const email = res.user.email;
        const userPicture = res.additionalUserInfo.profile.picture;
        // console.log("User:", user);
        // console.log("Picture:", userPicture);
        // ...
        register({
          variables: {
            id: id,
            username: user,
            email: email,
            img_url: userPicture,
          },
        }).then(res => {
          dispatch({ type: GOOGLE_REGISTER_SUCCESS, payload: res.data });
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
          type: "GOOGLE_REGISTER_FAILURE",
        });
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
      .then(res => {
        console.log(res);
        register({
          variables: {
            id: res.user.uid,
            username: input.username,
            email: input.email,
            img_url: input.img_url ? input.img_url : defaultPic,
          },
        }).then(res => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
        });
      })
      .catch(err => {
        dispatch({ type: "REGISTER_ERROR", payload: err.message });
        alert(err.message);
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleRegister}>
        <Card invert p="4rem" jc_evenly>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <Input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <Input
            name="img_url"
            type="text"
            placeholder="Image URL"
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <Button stretch type="submit">
            Register
          </Button>
          <Button stretch onClick={handleGoogleAuth}>
            Register with Google!
          </Button>
        </Card>
      </Form>
    </Wrapper>
  );
}
