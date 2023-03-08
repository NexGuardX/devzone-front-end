/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { userCategories } from '../../common/data/categories';
import { api } from '../../common/helpers/api';

const initialState = {
  currentToolId: 0,
  toastMessage: '',
  sidebarCategoriesAndTools: [],
  tools: [],
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
  },
});

export default applicationSlice.reducer;
export const { setCurrentToolId, setSidebarCategoriesAndTools, setToastMessage, setTools } =
  applicationSlice.actions;

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
      dispatch(setToastMessage({ title: 'Error fetching Sidebar', status: 'error' }));
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
