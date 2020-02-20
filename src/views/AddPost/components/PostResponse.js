import React from "react";

import { Card } from "bushido-strap";

export default function PostResponse({ response }) {
  return (
    <Card>
      <strong>{response}</strong>
    </Card>
  );
}
