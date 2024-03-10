import { createSlice } from '@reduxjs/toolkit';
import { setAuthStore } from '../../../core/state/middleware/utils';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuth = false;
      state.user = null;
      setAuthStore('')
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;