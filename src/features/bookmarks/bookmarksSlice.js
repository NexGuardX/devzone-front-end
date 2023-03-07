/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToastMessage } from '../application/applicationSlice';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  currentToolId: 0,
  listGroupedByTools: [],
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setCurrentToolId: (state, action) => {
      state.currentToolId = action.payload;
    },
    setListGroupedByTools: (state, action) => {
      state.listGroupedByTools = action.payload;
    },
  },
});

export default bookmarksSlice.reducer;
export const { setCurrentToolId, setListGroupedByTools, setMessage } = bookmarksSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchUserBookmarks = () => async (dispatch, getState) => {
  const { id } = getState().user;
  const { token } = getState().user;

  try {
    const response = await axios({
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
      method: 'GET',
      url: `${REACT_APP_API_URL}/bookmarks/user/${id}`,
    });
    dispatch(setListGroupedByTools(response.data));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error loading bookmarks', status: 'error' }));
  }
};

export const thunkAddBookmark = (data) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { listGroupedByTools } = getState().bookmarks;
  // Find informations for tool with tool ID
  const toolDataIndex = listGroupedByTools.findIndex((tool) => tool.toolId === data.toolId);
  const toolData = listGroupedByTools[toolDataIndex];

  try {
    const response = await axios({
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
      method: 'POST',
      url: `${REACT_APP_API_URL}/bookmark`,
      data,
    });

    if (!toolData) {
      dispatch(thunkFetchUserBookmarks());
    } else {
      const newListGroupedByTools = [...listGroupedByTools];
      const newToolData = {
        ...toolData,
        bookmarks: [response.data, ...toolData.bookmarks],
      };

      newListGroupedByTools[toolDataIndex] = newToolData;
      dispatch(setListGroupedByTools(newListGroupedByTools));
      dispatch(setToastMessage({ title: 'Bookmark added', status: 'success' }));
    }
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};

export const thunkDeleteBookmark = (id) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { listGroupedByTools } = getState().bookmarks;

  try {
    await axios({
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
      method: 'DELETE',
      url: `${REACT_APP_API_URL}/bookmark/${id}`,
    });

    // Remove bookmark with ID from Redux State
    const newListGroupedByTools = listGroupedByTools.map((tool) => ({
      ...tool,
      bookmarks: tool.bookmarks.filter((bookmark) => bookmark.id !== id),
    }));
    dispatch(setListGroupedByTools(newListGroupedByTools));
    dispatch(setToastMessage({ title: 'Bookmark deleted', status: 'warning' }));
    // const { toast } = createStandaloneToast({ defaultOptions: { status: 'error' } });

    // toast({ title: 'Toast' });
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error', status: 'error' }));
  }
};
