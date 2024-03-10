import { createSlice } from '@reduxjs/toolkit';

const channelMasterSlice = createSlice({
  name: 'channelMasters',
  initialState: {
    channelMasters: {},
    channelMastersCount: null,
    addUpdateChannelSuccess: false,
    verifyGstStatus: null,
    verifyPanStatus: null,
    verifyBankStatus: null,
    verifyCINStatus: null,
  },
  reducers: {
    fetchChannelMasters(state, action) { 
      state.channelMasters = action.payload;
    },
    channelMastersCount(state, action) { 
      state.channelMastersCount = action.payload ? action.payload: 0;
    },

    addUpdateChannelSuccess(state, action) { 
      state.addUpdateChannelSuccess = action.payload;
    },

    verifyGstStatus(state, action) {
      state.verifyGstStatus = action.payload;
    },

    verifyBankStatus(state, action) {
      state.verifyBankStatus = action.payload;
    },

    verifyPanStatus(state, action) {
      state.verifyPanStatus = action.payload;
    },
    verifyCINStatus(state, action) {
      state.verifyCINStatus = action.payload;
    }



  },
});

export const { fetchChannelMasters, 
  channelMastersCount, 
  addUpdateChannelSuccess, 
  verifyGstStatus, 
  verifyPanStatus, 
  verifyBankStatus, 
  verifyCINStatus } = channelMasterSlice.actions;

export default channelMasterSlice.reducer;