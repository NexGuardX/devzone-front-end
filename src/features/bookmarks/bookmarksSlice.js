/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentToolId: 0,
  list: [],
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setCurrentToolId: (state, action) => {
      state.currentToolId = action.payload;
    },
  },
});

export default bookmarksSlice.reducer;
export const { setCurrentToolId } = bookmarksSlice.actions;
