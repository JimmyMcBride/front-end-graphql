import React from "react";

import { Wrapper, Form, Input, Button, Card } from "bushido-strap";

import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { login, googleLogin } from "../../../store/actions/auth";

import { useInputChange } from "../../../hooks/useInputChange";

export default function Login() {
  const dispatch = useDispatch();

  const [input, handleInputChange] = useInputChange();

  // once user logs in isLoggedIn will be true and route you to home page
  const isLoggedIn = useSelector(state => !state.firebase.auth.isEmpty);

  if (isLoggedIn) return <Redirect to="/" />;
  const handleGoogleAuth = e => {
    e.preventDefault();
    dispatch(googleLogin());
  };

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login(input.email, input.password));
  };

  return (
    <Wrapper>
      <Form onSubmit={handleLogin}>
        <Card invert p="4rem" jc_evenly>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <Button stretch type="submit">
            Login
          </Button>
          <Button stretch onClick={handleGoogleAuth}>
            Sign in with Google!
          </Button>
        </Card>
      </Form>
    </Wrapper>
  );
}
