import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (category) => {
    let url;
    if (category === "news") {
      url = "/news";
    } else if (category === "popular") {
      url = "/popular";
    }
    const { data } = await axios.get(url);
    return data;
  }
);

export const fetchTagedPosts = createAsyncThunk(
  "posts/fetchTagedPosts",
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    // posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTagedPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchTagedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchTagedPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // comments
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    // removing
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
