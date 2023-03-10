/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../common/helpers/api';

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
});

export default applicationSlice.reducer;
export const { setSidebarCategoriesAndTools, setToastMessage } = applicationSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchSidebarCategoriesAndTools = () => async (dispatch, getState) => {
  const { username, id: userId } = getState().user;
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

  // if login
  // TODO Waiting for API ROUTES
  try {
    // eslint-disable-next-line consistent-return
    const response = await api.get(`/categories/user/${userId}`);
    const categories = response.data;
    dispatch(setSidebarCategoriesAndTools(categories));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error fetching sidebar', status: 'error' }));
  }
};
