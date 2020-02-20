import gql from "graphql-tag";

export const addPostQuery = gql`
  mutation AddPost(
    $id: ID!
    $title: String!
    $body: String!
    $user_id: String!
  ) {
    addPost(creds: { id: $id, title: $title, body: $body, user_id: $user_id }) {
      id
      title
      body
      user {
        username
        img_url
      }
    }
  }
`;
