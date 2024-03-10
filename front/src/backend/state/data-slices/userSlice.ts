import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    usersCount: number,
    addUpdateSuccess: false,
  },
  reducers: {
    fetchUsers(state, action) { 
      state.users = action.payload;
    },
    usersCountReducer(state, action) { 
      state.usersCount = action.payload;
    },
    addUpdateSuccessAction(state, action) { 
      state.addUpdateSuccess = action.payload;
    },
  },
});

export const { fetchUsers, usersCountReducer, addUpdateSuccessAction } = userSlice.actions;

export default userSlice.reducer;