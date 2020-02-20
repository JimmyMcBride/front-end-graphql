import gql from "graphql-tag";

export const getUserQuery = gql`
  query GetUser($id: ID!) {
    user(where: { id: $id }) {
      username
      email
      img_url
      posts {
        title
        body
        user {
          username
        }
      }
    }
  }
`;
