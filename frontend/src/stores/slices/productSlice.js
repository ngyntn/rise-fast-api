/**
 * Products Redux Slice
 * Manages product state and product-related actions
 */

import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../apis/productApi";

const initialState = {
  products: [],
  productStatus: {
    time: 0,
    loading: null,
    error: null,
    status: null,
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    /**
     * Reset product state to initial values
     */
    resetProductState: (state) => {
      state.products = [];
      state.productStatus.time = 0;
      state.productStatus.loading = null;
      state.productStatus.error = null;
      state.productStatus.status = null;
    },

  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.productStatus.loading = true;
        state.productStatus.error = null;
        state.productStatus.status = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.productStatus.loading = false;
        state.productStatus.status = 200;
        state.productStatus.time = payload.time;
        state.products = payload.data;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.productStatus.loading = false;
        state.productStatus.error = payload || "Failed to fetch products.";
        state.productStatus.status = 400;
      })  
  }
});

// Export actions
export const { resetProductState } = productSlice.actions;

// Export reducer
export default productSlice.reducer;