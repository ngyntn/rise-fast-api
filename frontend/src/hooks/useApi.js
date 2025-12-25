/**
 * useApi Hook
 * Custom hook for handling API calls with loading states
 */

import { useState, useCallback } from 'react';
import { COMPONENT_STATES } from '../config/constants.js';

/**
 * useApi Hook
 * @param {Function} apiFunction - API function to call
 * @returns {Object} API state and methods
 */
const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(COMPONENT_STATES.IDLE);
  const [error, setError] = useState(null);

  /**
   * Execute API call
   * @param {...any} args - Arguments to pass to API function
   * @returns {Promise} API response
   */
  const execute = useCallback(async (...args) => {
    try {
      setStatus(COMPONENT_STATES.LOADING);
      setError(null);
      
      const response = await apiFunction(...args);
      
      setData(response);
      setStatus(COMPONENT_STATES.SUCCESS);
      
      return response;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra');
      setStatus(COMPONENT_STATES.ERROR);
      throw err;
    }
  }, [apiFunction]);

  /**
   * Reset API state
   */
  const reset = useCallback(() => {
    setData(null);
    setStatus(COMPONENT_STATES.IDLE);
    setError(null);
  }, []);

  return {
    data,
    status,
    error,
    isLoading: status === COMPONENT_STATES.LOADING,
    isSuccess: status === COMPONENT_STATES.SUCCESS,
    isError: status === COMPONENT_STATES.ERROR,
    isIdle: status === COMPONENT_STATES.IDLE,
    execute,
    reset,
  };
};

export default useApi;