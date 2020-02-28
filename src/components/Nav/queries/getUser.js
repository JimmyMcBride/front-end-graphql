import gql from "graphql-tag";

export const getUserQuery = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      email
      img_url
    }
  }
`;
