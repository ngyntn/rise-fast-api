/**
 * Authentication API Services
 * Handles all authentication-related API calls
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient.js";
import { API_ENDPOINTS, STORAGE_KEYS } from "../config/constants.js";
import { saveToStorage, removeFromStorage } from "../utils/storage.js";

/**
 * Login user
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Promise<Object>} Login response with tokens and user data
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Save tokens to storage
      if (response.data.accessToken) {
        saveToStorage(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      }
      if (response.data.refreshToken) {
        saveToStorage(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Đăng nhập thất bại");
    }
  }
);






/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Clear storage
      removeFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
      removeFromStorage(STORAGE_KEYS.USER_PROFILE);
      
      return { message: "Đăng xuất thành công" };
    } catch (error) {
      // Even if API call fails, clear local storage
      removeFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
      removeFromStorage(STORAGE_KEYS.USER_PROFILE);
      
      return rejectWithValue(error.message || "Đăng xuất thất bại");
    }
  }
);

/**
 * Refresh access token
 * @returns {Promise<Object>} New access token
 */
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
      
      if (response.data.accessToken) {
        saveToStorage(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      }
      
      return response;
    } catch (error) {
      // If refresh fails, clear all tokens
      removeFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
      
      return rejectWithValue(error.message || "Phiên đăng nhập đã hết hạn");
    }
  }
);

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Không thể lấy thông tin người dùng");
    }
  }
);