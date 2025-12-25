
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient.js";
import { API_ENDPOINTS } from "../config/constants.js";


/**
 * Get products
 * @returns {Promise<Object>} Products data
 */
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    const startTime = Date.now();
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT.GET_PRODUCTS);

      const endTime = Date.now();
      const duration = endTime - startTime;

      return {
        data: response,
        time: duration
      };
    } catch (error) {
      return rejectWithValue(error.message || "Cannot fetch products");
    }
  }
);