import React from "react";

import { Wrapper, Linkton, Box, Card } from "bushido-strap";

export default function LandingPage() {
  return (
    <Wrapper>
      <Card p="4rem">
        <h2>Welcome!</h2>
        <Linkton green stretch to="/register">
          Register Today!
        </Linkton>
        <Box h="1.2rem" />
        <p>Already have an account?</p>
        <Linkton blue stretch to="/login">
          Login Here
        </Linkton>
      </Card>
    </Wrapper>
  );
}
