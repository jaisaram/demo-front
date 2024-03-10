import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';

const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: {},
    count: null,
    permissions: {},
    success: false,

  },
  reducers: {
    fetchRoles(state, action) { 
      state.roles = action.payload;
    },
    roleCount(state, action) { 
      state.count = action.payload ? action.payload : 0;
    },

    rolePermissions(state, action) { 
      state.permissions = action.payload;
    },
    recievedSuccess(state, action) {
      state.success = action.payload;
    }

  },
});

export const { fetchRoles, roleCount, rolePermissions, recievedSuccess } = roleSlice.actions;

export default roleSlice.reducer;