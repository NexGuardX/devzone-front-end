/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { categories, userCategories } from '../../common/data/categories';

const initialState = {
  sidebarCategoriesAndTools: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    removeToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    setSignupForm: (state, action) => {
      state.SignupForm = action.payload;
    },
    setUserInfos: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSidebarCategoriesAndTools: (state, action) => {
      state.sidebarCategoriesAndTools = action.payload;
    },

    logout: () => initialState,
  },
});

export default userSlice.reducer;

export const {
  removeToolsUser,
  setSignupForm,
  setUsername,
  setToolsUser,
  setLastname,
  setFirstname,
  setId,
  setWebsite,
  setEmail,
  setDescription,
  setUserInfos,
  setToken,
  setSidebarCategoriesAndTools,
  logout,
} = userSlice.actions;

const { REACT_APP_API_URL } = process.env;

const thunkLogin =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/login`, {
        email,
        username,
        password,
      });

      dispatch(setUserInfos(response.data.user));
      dispatch(setToken(response.data.token.accessToken));

      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
export { thunkLogin };

export const thunkSignup =
  ({ username, email, password, confirmedPassword }) =>
  async (dispatch) => {
    const SignupForm = { username, email, password, confirmedPassword };
    dispatch(setSignupForm(SignupForm));
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/signup`, {
        username,
        email,
        password,
        confirmedPassword,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const thunkFetchSidebarCategoriesAndTools = () => async (dispatch, getState) => {
  const { username } = getState().user;
  if (!username) {
    console.log('SIDEBAR CLASSIC');
    try {
      // const response = await axios(`${REACT_APP_API_URL}/categories`);
      // const categories = response.data;
      dispatch(setSidebarCategoriesAndTools(categories));
    } catch (error) {
      console.error(error);
    }
    return;
  }

  // if not login
  try {
    // eslint-disable-next-line consistent-return
    // const response = await axios(`${REACT_APP_API_URL}/categories/userID`);
    // const categories = response.data;
    dispatch(setSidebarCategoriesAndTools(userCategories));
  } catch (error) {
    console.error(error);
  }
};
