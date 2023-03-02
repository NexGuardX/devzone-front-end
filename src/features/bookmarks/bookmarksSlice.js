/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

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

export const thunkBookmark = (data) => async (dispatch, getState) => {
  const { token } = getState().user;
  const response = await axios({
    config: {
      headers: { Authorization: `Bearer ${token}` },
    },
    method: 'POST',
    url: `${REACT_APP_API_URL}/bookmark`,
    data,
  });
  console.log('⏩ ~ response:', response);
};
