/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../common/helpers/api';
import { getTotalBookmarks } from '../../common/helpers/bookmarks';
import { setToastMessage } from '../application/applicationSlice';

const initialState = {
  listGroupedByTools: [],
  total: 0,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setListGroupedByTools: (state, action) => {
      state.listGroupedByTools = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export default bookmarksSlice.reducer;
export const { setListGroupedByTools, setTotal } = bookmarksSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchUserBookmarks = () => async (dispatch, getState) => {
  const { id: userId } = getState().user;

  if (!userId) {
    return;
  }

  try {
    const response = await api.get(`/bookmarks/user/${userId}`);
    dispatch(setListGroupedByTools(response.data));

    const total = getTotalBookmarks(response.data);
    dispatch(setTotal(total));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error loading bookmarks', status: 'error' }));
  }
};

export const thunkAddBookmark = (data) => async (dispatch, getState) => {
  const { listGroupedByTools, total } = getState().bookmarks;
  // Find informations for tool with tool ID
  const toolDataIndex = listGroupedByTools.findIndex((tool) => tool.toolId === data.toolId);
  const toolData = listGroupedByTools[toolDataIndex];

  try {
    const response = await api.post('/bookmark', data);

    const newListGroupedByTools = [...listGroupedByTools];
    const newToolData = {
      ...toolData,
      bookmarks: [response.data, ...toolData.bookmarks],
    };

    newListGroupedByTools[toolDataIndex] = newToolData;
    dispatch(setListGroupedByTools(newListGroupedByTools));
    dispatch(setTotal(total + 1));
    dispatch(setToastMessage({ title: 'Bookmark added', status: 'success' }));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};

export const thunkDeleteBookmark = (id) => async (dispatch, getState) => {
  const { listGroupedByTools, total } = getState().bookmarks;

  try {
    await api.delete(`/bookmark/${id}`);

    // Remove bookmark with ID from Redux State
    const newListGroupedByTools = listGroupedByTools.map((tool) => ({
      ...tool,
      bookmarks: tool.bookmarks.filter((bookmark) => bookmark.id !== id),
    }));
    dispatch(setListGroupedByTools(newListGroupedByTools));
    dispatch(setTotal(total - 1));
    dispatch(setToastMessage({ title: 'Bookmark deleted', status: 'warning' }));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};
