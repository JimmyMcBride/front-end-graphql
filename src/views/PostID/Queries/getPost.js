import gql from "graphql-tag";

export const getPostQuery = gql`
  query getPost($id: String!) {
    post(id: $id) {
      # posts {
      id
      title
      body
      user {
        username
        img_url
      }
      comments {
        id
        body
        user {
          username
          img_url
        }
      }
    }
  }
`;
