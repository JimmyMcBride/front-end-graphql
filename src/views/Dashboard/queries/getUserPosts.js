import gql from "graphql-tag";

export const getUserPostsQuery = gql`
  query getUserPosts($id: String!) {
    user(id: $id) {
      id
      username
      img_url
      posts {
        id
        title
        body
        comments {
          id
        }
      }
    }
  }
`;
