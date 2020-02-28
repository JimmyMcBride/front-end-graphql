import gql from "graphql-tag";

export const registerUser = gql`
  mutation Register(
    $id: ID!
    $email: String!
    $username: String!
    $img_url: String!
  ) {
    register(
      creds: { id: $id, email: $email, username: $username, img_url: $img_url }
    ) {
      id
      email
      username
      img_url
    }
  }
`;
