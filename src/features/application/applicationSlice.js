/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { userCategories } from '../../common/data/categories';
import { api } from '../../common/helpers/api';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  toastMessage: '',
  sidebarCategoriesAndTools: [],
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
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
  },

  seForm: (state, action) => {
    state.form = action.payload;
  },
});

export default applicationSlice.reducer;
export const { setSidebarCategoriesAndTools, setToastMessage, setForm } = applicationSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchSidebarCategoriesAndTools = () => async (dispatch, getState) => {
  const { username } = getState().user;
  if (!username) {
    try {
      const response = await api.get('/categories');
      const categories = response.data;
      dispatch(setSidebarCategoriesAndTools(categories));
    } catch (error) {
      dispatch(setToastMessage({ title: 'Error fetching sidebar', status: 'error' }));
    }
    return;
  }

  // if not login
  // TODO Waiting for API ROUTES
  try {
    // eslint-disable-next-line consistent-return
    // const response = await axios(`${REACT_APP_API_URL}/categories/userID`);
    // const categories = response.data;
    dispatch(setSidebarCategoriesAndTools(userCategories));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error fetching sidebar', status: 'error' }));
  }
};

export const thunkContactForm = (form) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/contact`, form);
    dispatch(
      setToastMessage({ title: 'Your message has been sent successfully', status: 'success' })
    );
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error sending message', status: 'error' }));
  }
};
