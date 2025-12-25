/**
 * Posts Redux Slice
 * Manages post state and post-related actions
 */

import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../apis/postApi";

const initialState = {
  posts: [],
  postStatus: {
    time: 0,
    loading: null,
    error: null,
    status: 200,
  }
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    /**
     * Reset post state to initial values
     */
    resetPostState: (state) => {
      state.posts = [];
      state.postStatus.loading = null;
      state.postStatus.error = null;
      state.postStatus.status = null;
    },

  },
  extraReducers: (builder) => {
    builder
      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.postStatus.loading = true;
        state.postStatus.error = null;
        state.postStatus.status = null;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.postStatus.loading = false;
        state.postStatus.status = 200;
        state.postStatus.time = payload.time;
        state.posts = payload.data;
        console.log("Payload in postSlice:");
        console.log(payload);
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.postStatus.loading = false;
        state.postStatus.error = payload || "Failed to fetch posts.";
        state.postStatus.status = 400;
      })
  }
});

// Export actions
export const { resetPostState } = postSlice.actions;

// Export reducer
export default postSlice.reducer;