import { createSlice } from '@reduxjs/toolkit';

const productMasterSlice = createSlice({
  name: 'productMasters',
  initialState: {
    productMasters: {},
    counts: 0,
    addUpdateProductSuccess: false,

  },
  reducers: {
    fetchProductMasters(state, action) { 
      state.productMasters = action.payload;
    },
    productMastersCount(state, action) { 
      state.counts = action.payload ? action.payload: 0;
    },
    addUpdateProductSuccess(state, action) { 
      state.addUpdateProductSuccess = action.payload;
    },
  },
});

export const { fetchProductMasters, productMastersCount , addUpdateProductSuccess} = productMasterSlice.actions;

export default productMasterSlice.reducer;