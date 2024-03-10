import { createSlice } from '@reduxjs/toolkit';

const bankMasterSlice = createSlice({
  name: 'bankMasters',
  initialState: {
    bankMasters: {},
    bankMastersCount: 0,
    addUpdateBankSuccess: false,

  },
  reducers: {
    fetchBankMasters(state, action) { 
      state.bankMasters = action.payload;
    },
    bankMastersCount(state, action) { 
      state.bankMastersCount = action.payload ? action.payload: 0;
    },
    addUpdateBankSuccess(state, action) { 
      state.addUpdateBankSuccess = action.payload;
    },
  },
});

export const { fetchBankMasters, bankMastersCount , addUpdateBankSuccess} = bankMasterSlice.actions;

export default bankMasterSlice.reducer;