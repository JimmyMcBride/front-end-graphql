import gql from "graphql-tag";

export const getPostsQuery = gql`
  {
    posts {
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
