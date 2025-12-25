
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient.js";
import { API_ENDPOINTS } from "../config/constants.js";


/**
 * Get posts
 * @returns {Promise<Object>} Posts data
 */
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    const startTime = Date.now();
    try {
      const response = await apiClient.get(API_ENDPOINTS.POST.GET_POSTS);
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      return {
        data: response,
        time: duration
      };
    } catch (error) {
      return rejectWithValue(error.message || "Cannot fetch posts");
    }
  }
);