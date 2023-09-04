import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags, fetchComments } from "../redux/slices/posts";
import { Link, useLocation } from "react-router-dom";
import { SideCommentsBlock } from "../components/SideCommentsBlock";
import { List, ListItemButton, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

const navigationItems = [
  { to: "/news", label: "Новые" },
  { to: "/popular", label: "Популярные" },
  { to: "/rated", label: "Лучшие" },
];

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const location = useLocation();

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  useEffect(() => {
    if (location.pathname.includes("popular")) {
      dispatch(fetchPosts("popular"));
    } else if (location.pathname.includes("rated")) {
      dispatch(fetchPosts("rated"));
    } else {
      dispatch(fetchPosts("news"));
    }
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [location]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <List style={{ display: "flex", flexDirection: "row" }}>
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <ListItemButton>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Box sx={{ minHeight: 829 }}>
          <Masonry columns={2} spacing={2}>
            {(isPostsLoading ? [...Array(5)] : posts.items).map(
              (obj, index) => (
                <div key={index}>
                  {isPostsLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      key={index}
                      id={obj._id}
                      title={obj.title}
                      text={obj.text}
                      imageUrl={
                        obj.imageUrl
                          ? `http://localhost:4444${obj.imageUrl}`
                          : ""
                      }
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={obj.comments.length}
                      tags={obj.tags}
                      likes={obj.likes.count}
                      userLikes={obj.likes.users}
                      isEditable={userData?._id === obj.user._id}
                    />
                  )}
                </div>
              )
            )}
          </Masonry>
        </Box>
      </Grid>
      <Grid sx={{ marginTop: 8 }} item xs={12} sm={4}>
        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        <SideCommentsBlock
          items={comments.items}
          isLoading={isCommentsLoading}
        />
      </Grid>
    </Grid>
  );
};
