/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../common/helpers/api';
import { setToastMessage } from '../application/applicationSlice';

const initialState = {
  listGroupedByTools: [],
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setListGroupedByTools: (state, action) => {
      state.listGroupedByTools = action.payload;
    },
  },
});

export default bookmarksSlice.reducer;
export const { setListGroupedByTools } = bookmarksSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchUserBookmarks = () => async (dispatch, getState) => {
  const { id } = getState().user;

  try {
    const response = await api.get(`/bookmarks/user/${id}`);
    dispatch(setListGroupedByTools(response.data));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error loading bookmarks', status: 'error' }));
  }
};

export const thunkAddBookmark = (data) => async (dispatch, getState) => {
  const { listGroupedByTools } = getState().bookmarks;
  // Find informations for tool with tool ID
  const toolDataIndex = listGroupedByTools.findIndex((tool) => tool.toolId === data.toolId);
  const toolData = listGroupedByTools[toolDataIndex];

  try {
    const response = await api.post('/bookmark', data);

    if (!toolData) {
      // First time, there is no bookmarks at all
      // Must call API to retrieve array structure of bookmarks
      dispatch(thunkFetchUserBookmarks());
    } else {
      const newListGroupedByTools = [...listGroupedByTools];
      const newToolData = {
        ...toolData,
        bookmarks: [response.data, ...toolData.bookmarks],
      };

      newListGroupedByTools[toolDataIndex] = newToolData;
      dispatch(setListGroupedByTools(newListGroupedByTools));
    }
    dispatch(setToastMessage({ title: 'Bookmark added', status: 'success' }));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};

export const thunkDeleteBookmark = (id) => async (dispatch, getState) => {
  const { listGroupedByTools } = getState().bookmarks;

  try {
    await api.delete(`/bookmark/${id}`);

    // Remove bookmark with ID from Redux State
    const newListGroupedByTools = listGroupedByTools.map((tool) => ({
      ...tool,
      bookmarks: tool.bookmarks.filter((bookmark) => bookmark.id !== id),
    }));
    dispatch(setListGroupedByTools(newListGroupedByTools));
    dispatch(setToastMessage({ title: 'Bookmark deleted', status: 'warning' }));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};
