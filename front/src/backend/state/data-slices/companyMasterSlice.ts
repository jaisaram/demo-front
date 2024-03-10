import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';

const companyMasterSlice = createSlice({
  name: 'companyMasters',
  initialState: {
    companyMasters: {},
    companyMastersCount: null,
    addUpdateCompanySuccess: false
  },
  reducers: {
    fetchCompanyMasters(state, action) { 
      state.companyMasters = action.payload;
    },
    companyMastersCount(state, action) { 
      state.companyMastersCount = action.payload ? action.payload: 0;
    },

    addUpdateCompanySuccess(state, action) { 
      state.addUpdateCompanySuccess = action.payload;
    },

  },
});

export const { fetchCompanyMasters, companyMastersCount, addUpdateCompanySuccess } = companyMasterSlice.actions;

export default companyMasterSlice.reducer;