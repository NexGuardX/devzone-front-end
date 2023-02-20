/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'jojoLesBiscotos',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUsername } = userSlice.actions;
