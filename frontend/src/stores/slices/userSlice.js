/**
 * User Redux Slice
 * Manages user state and user-related actions
 */

import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile, changePassword } from "../../apis/singleUserApi.js";
import { COMPONENT_STATES } from "../../config/constants.js";

const initialState = {
  user: null,
  message: null,
  status: COMPONENT_STATES.IDLE, // 'idle' | 'loading' | 'success' | 'error'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Reset user state to initial values
     */
    resetUserState: (state) => {
      state.status = COMPONENT_STATES.IDLE;
      state.error = null;
      state.message = null;
    },
    
    /**
     * Clear user data (for logout)
     */
    clearUserData: (state) => {
      state.user = null;
      state.status = COMPONENT_STATES.IDLE;
      state.error = null;
      state.message = null;
    },
    
    /**
     * Update user data locally
     * @param {Object} action.payload - User data to update
     */
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.message = payload.message;
        state.user = payload.data.user;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.error = payload;
        state.message = null;
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.message = payload.message;
        if (payload.data.user) {
          state.user = payload.data.user;
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.error = payload;
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.error = payload;
      });
  }
});

// Export actions
export const { resetUserState, clearUserData, updateUserData } = userSlice.actions;

// Export selectors
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUserMessage = (state) => state.user.message;
export const selectIsUserLoading = (state) => state.user.status === COMPONENT_STATES.LOADING;

// Export reducer
export default userSlice.reducer;