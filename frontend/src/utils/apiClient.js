/**
 * Centralized API Client
 * Handles all HTTP requests with interceptors, error handling, and token management
 */

import { API_CONFIG, APP_CODES, STORAGE_KEYS } from '../config/constants.js';
import { getFromStorage, removeFromStorage } from './storage.js';

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Get authorization headers
   * @returns {Object} Headers object with authorization
   */
  getAuthHeaders() {
    const token = getFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  /**
   * Handle API response
   * @param {Response} response - Fetch response object
   * @returns {Promise<Object>} Parsed response data
   */
async handleResponse(response) {
    const data = await response.json();
    
    // NẾU data là Array (List từ Spring Boot), trả về luôn, không check code
    if (Array.isArray(data)) {
        return data;
    }

    // Chỉ check code nếu data là Object và có thuộc tính code
    if (data && data.code && data.code !== APP_CODES.SUCCESS) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  }

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @throws {Error} Formatted error
   */
  handleError(error) {
    // Handle network errors
    if (!navigator.onLine) {
      throw new Error('Không có kết nối internet');
    }

    // Handle timeout errors
    if (error.name === 'AbortError') {
      throw new Error('Yêu cầu bị timeout');
    }

    // Handle authentication errors
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      removeFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
      window.location.href = '/login';
      throw new Error('Phiên đăng nhập đã hết hạn');
    }

    throw error;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} API response
   */
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.getAuthHeaders(),
        signal: controller.signal,
        ...options,
      };

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      this.handleError(error);
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} API response
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} API response
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} API response
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;