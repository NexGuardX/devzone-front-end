/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null },
  reducers: {
    SetLogIn: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    logOut: (state, action) => {
      state.email = null;
    },
  },
});

export const { SetLogIn, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentEmail = (state) => state.auth.email;
