import React from "react";

import { Wrapper, Form, Input, Button, Card } from "bushido-strap";

import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { register, googleRegister } from "../../../store/actions/auth";

import { useInputChange } from "../../../hooks/useInputChange";

import Loading from "../../../components/Loading";

export default function Login() {
  const dispatch = useDispatch();

  const [input, handleInputChange] = useInputChange();

  // once user logs in isLoggedIn will be true and route you to home page
  const isLoggedIn = useSelector(state => !state.firebase.auth.isEmpty);

  // If user is logged in on login page redirects them to protected route
  const loading = useSelector(state => state.firebase.isInitializing);

  if (isLoggedIn) return <Redirect to="/" />;

  if (loading) return <Loading />;

  const handleGoogleAuth = e => {
    e.preventDefault();
    dispatch(googleRegister());
  };

  const handleRegister = e => {
    e.preventDefault();
    dispatch(register(input.email, input.password));
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
