import React from "react";

import { Card, Button, theme } from "bushido-strap";

import { useDeletePost } from "../hooks/useDeletePost";

import { DELETE_POST } from "../index";

export default function UserPosts({ loading, posts, dispatch }) {
  const [deletePost, handleDeletePost] = useDeletePost();
  return (
    <Card invert max_w="50vw">
      {loading ? (
        <Card>
          <h6>Loading...</h6>
        </Card>
      ) : !loading && posts?.length === 0 ? (
        <Card>
          <h3>No posts yet...</h3>
        </Card>
      ) : (
        posts?.map(item => (
          <Card stretch key={item.id}>
            <Card bg={theme.blackAlpha7} stretch>
              <Card stretch>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Card>
            </Card>
            <Card row stretch jc_between invert>
              <Button orange w="65%">
                Update Post
              </Button>
              <Button
                red
                w="30%"
                onClick={e => {
                  e.preventDefault();
                  handleDeletePost(item.id);
                  dispatch({
                    type: DELETE_POST,
                    payload: deletePost?.posts
                  });
                }}
              >
                Delete Post
              </Button>
            </Card>
          </Card>
        ))
      )}
    </Card>
  );
}
