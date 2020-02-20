import gql from "graphql-tag";

export const addCommentMutation = gql`
  mutation AddComment(
    $id: ID!
    $body: String!
    $user_id: String!
    $post_id: String!
  ) {
    addComment(
      creds: { id: $id, body: $body, user_id: $user_id, post_id: $post_id }
    ) {
      response
    }
  }
`;
