import { Grid } from "@mui/material";
import React from "react";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagedPosts } from "../redux/slices/posts";
import { useParams } from "react-router-dom";

export const TagedPosts = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchTagedPosts(tag));
  }, [dispatch, tag]);

  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          )
        )}
      </Grid>
    </Grid>
  );
};
