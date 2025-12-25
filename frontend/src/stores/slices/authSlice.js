/**
 * Authentication Redux Slice
 * Manages authentication state and auth-related actions
 */

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshToken, getCurrentUser } from "../../apis/authApi.js";
import { COMPONENT_STATES, STORAGE_KEYS } from "../../config/constants.js";
import { getFromStorage } from "../../utils/storage.js";

const initialState = {
  user: null,
  isAuthenticated: !!getFromStorage(STORAGE_KEYS.ACCESS_TOKEN),
  status: COMPONENT_STATES.IDLE, // 'idle' | 'loading' | 'success' | 'error'
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Reset auth state
     */
    resetAuthState: (state) => {
      state.status = COMPONENT_STATES.IDLE;
      state.error = null;
      state.message = null;
    },
    
    /**
     * Set authentication status manually
     * @param {Object} action.payload - Authentication status
     */
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    
    /**
     * Clear auth error
     */
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.isAuthenticated = true;
        state.user = payload.data.user;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.isAuthenticated = false;
        state.user = null;
        state.error = payload;
      })
      
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.isAuthenticated = false;
        state.user = null;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.isAuthenticated = false;
        state.user = null;
        state.error = payload;
      })
      
      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.isAuthenticated = false;
        state.user = null;
        state.error = payload;
      })
      
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.user = payload.data.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.error = payload;
      });
  }
});

// Export actions
export const { resetAuthState, setAuthStatus, clearAuthError } = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;
export const selectIsAuthLoading = (state) => state.auth.status === COMPONENT_STATES.LOADING;

// Export reducer
export default authSlice.reducer;