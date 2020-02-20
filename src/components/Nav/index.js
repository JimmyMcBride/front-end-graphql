import React from "react";

import { Row, Box, theme, Button } from "bushido-strap";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/actions/auth";

export default function Nav() {
  const dispatch = useDispatch();

  const { photoURL, displayName } = useSelector(state => state.firebase.auth);

  function handleSignOut() {
    dispatch(logout());
  }
  return (
    <Row stretch jc_center p="1rem 0" bg={`${theme.blackAlpha5}`}>
      <Box sqr="5rem" circle>
        <img src={photoURL} alt="user profile" />
      </Box>
      <h6>Hello, {displayName}!</h6>
      <Box h="2rem" />
      <Button h="100%" onClick={handleSignOut} red>
        Sign Out
      </Button>
    </Row>
  );
}
