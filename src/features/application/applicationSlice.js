/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../common/helpers/api';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  currentToolId: 0,
  toastMessage: '',
  sidebarCategoriesAndTools: [],
  tools: [],
  isCategoriesUserLoaded: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setCurrentToolId: (state, action) => {
      state.currentToolId = action.payload;
    },
    setToastMessage: (state, action) => {
      const { title, status } = action.payload;
      state.toastMessage = action.payload
        ? {
            title,
            status,
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          }
        : null;
    },
    setSidebarCategoriesAndTools: (state, action) => {
      state.sidebarCategoriesAndTools = action.payload;
    },
    setTools: (state, action) => {
      state.tools = action.payload;
    },
    setIsCategoriesUserLoaded: (state, action) => {
      state.isCategoriesUserLoaded = action.payload;
    },
  },
});

export default applicationSlice.reducer;
export const {
  setCurrentToolId,
  setSidebarCategoriesAndTools,
  setToastMessage,
  setTools,
  setIsCategoriesUserLoaded,
} = applicationSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchSidebarCategoriesAndTools = () => async (dispatch, getState) => {
  const { username, id: userId } = getState().user;
  if (!userId) {
    try {
      const response = await api.get('/categories');
      const categories = response.data;
      dispatch(setSidebarCategoriesAndTools(categories));
    } catch (error) {
      dispatch(setToastMessage({ title: 'Error fetching Sidebar', status: 'error' }));
    }
    return;
  }

  // if login
  // TODO Waiting for API ROUTES
  try {
    // eslint-disable-next-line consistent-return
    const response = await api.get(`/categories/user/${userId}`);
    const categories = response.data;
    dispatch(setSidebarCategoriesAndTools(categories));
    dispatch(setIsCategoriesUserLoaded(true));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error fetching Sidebar', status: 'error' }));
  }
};

export const thunkFetchTools = () => async (dispatch) => {
  try {
    const response = await api.get('/tools');
    const tools = response.data;
    dispatch(setTools(tools));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error fetching Tools', status: 'error' }));
  }
};

export const thunkContactForm = (form) => async (dispatch) => {
  try {
    await axios.post(`${REACT_APP_API_URL}/contact`, form);
    dispatch(
      setToastMessage({ title: 'Your message has been sent successfully', status: 'success' })
    );
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error sending message', status: 'error' }));
  }
};
