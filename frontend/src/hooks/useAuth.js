/**
 * useAuth Hook
 * Custom hook for authentication-related functionality
 */

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import {
  selectIsAuthenticated,
  selectAuthUser,
  selectAuthStatus,
  selectAuthError,
  selectIsAuthLoading,
} from '../stores/slices/authSlice.js';
import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from '../apis/authApi.js';
import { ROUTES, STORAGE_KEYS } from '../config/constants.js';
import { getFromStorage } from '../utils/storage.js';

/**
 * useAuth Hook
 * @returns {Object} Authentication state and methods
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsAuthLoading);

  /**
   * Login function
   * @param {Object} credentials - Login credentials
   * @param {string} redirectTo - Route to redirect after login
   */
  const login = useCallback(async (credentials, redirectTo = ROUTES.DASHBOARD) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      navigate(redirectTo);
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch, navigate]);

  /**
   * Logout function
   * @param {string} redirectTo - Route to redirect after logout
   */
  const logout = useCallback(async (redirectTo = ROUTES.LOGIN) => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate(redirectTo);
    } catch (error) {
      // Even if logout API fails, redirect to login
      navigate(redirectTo);
    }
  }, [dispatch, navigate]);

  /**
   * Check authentication status on mount
   */
  const checkAuth = useCallback(async () => {
    const token = getFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && !user) {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        // If getting user fails, logout
        logout();
      }
    }
  }, [dispatch, user, logout]);

  /**
   * Initialize auth check on mount
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    // State
    isAuthenticated,
    user,
    status,
    error,
    isLoading,
    
    // Methods
    login,
    logout,
    checkAuth,
  };
};

export default useAuth;