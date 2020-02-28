import React, { useEffect } from "react";

import { Flex, Box, Button, Text } from "bushido-strap";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/actions/auth";

import { useQuery } from "@apollo/react-hooks";

import { getUserQuery } from "./queries/getUser";

import { GET_USER } from "../../store/types";

export default function Nav() {
  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.firebase.auth);

  const { img_url, username } = useSelector(state => state.auth.user);

  const { data, loading } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });

  useEffect(() => {
    dispatch({ type: GET_USER, payload: data });
  }, [data, dispatch]);

  function handleSignOut() {
    dispatch(logout());
  }
  return (
    <Flex stretch jc_center>
      {loading ? (
        <Text bold xlf>
          Loading...
        </Text>
      ) : (
        <Flex ai_center>
          <Box sqr="5rem" circle>
            <img src={img_url} alt="user profile" />
          </Box>
          <Text bold xlf>
            Hello, {username}!
          </Text>
        </Flex>
      )}
      <Box h="2rem" />
      <Button h="100%" onClick={handleSignOut} red>
        Sign Out
      </Button>
    </Flex>
  );
}
