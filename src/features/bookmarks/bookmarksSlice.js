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
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default bookmarksSlice.reducer;
export const { setCurrentToolId, setList } = bookmarksSlice.actions;

export const thunkAddBookmark = (data) => async (dispatch, getState) => {
  console.log('⏩ ~ thunkAddBookmark ~ data:', data);
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

export const thunkDeleteBookmark = (id) => async (dispatch, getState) => {
  // TODO Handle ERRORS + try catch
  // TODO Add Image link
  // TODO add tool name/tag
  const { token } = getState().user;
  const { list } = getState().bookmarks;
  const response = await axios({
    config: {
      headers: { Authorization: `Bearer ${token}` },
    },
    method: 'DELETE',
    url: `${REACT_APP_API_URL}/bookmark/${id}`,
  });
  dispatch(setList(list.filter((item) => item.id !== id)));
};

export const thunkFetchUserBookmarks = () => async (dispatch, getState) => {
  const { id } = getState().user;
  const { token } = getState().user;
  const response = await axios({
    config: {
      headers: { Authorization: `Bearer ${token}` },
    },
    method: 'GET',
    url: `${REACT_APP_API_URL}/bookmarks/user/${id}`,
  });
  console.log('⏩ ~ response:', response);
  dispatch(setList(response.data));
};
