/**
 * User API Services
 * Handles all user-related API calls using Redux Toolkit Query
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient.js";
import { API_ENDPOINTS } from "../config/constants.js";

/**
 * Get user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_PROFILE);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Không thể lấy thông tin người dùng");
    }
  }
);

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated profile data
 */
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Không thể cập nhật thông tin");
    }
  }
);

/**
 * Change user password
 * @param {Object} passwordData - Password change data
 * @returns {Promise<Object>} Success response
 */
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Không thể đổi mật khẩu");
    }
  }
);
