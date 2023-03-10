/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-named-as-default-member
import authHeader from '../../common/helpers/authHeader';
import { thunkFetchSidebarCategoriesAndTools } from '../application/applicationSlice';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  username: '',
  // avatar: profilePicture,
  categories: [],
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
    setCategoriesUser: (state, action) => {
      state.categories = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    setSignupForm: (state, action) => {
      state.SignupForm = action.payload;
    },
    logout: () => initialState,
    setFetchResponse: (state, action) => {
      state.response = action.payload;
    },
    setEmailOrUsername: (state, action) => {
      state.emailOrUsername = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  removeToolsUser,
  setSignupForm,
  setUsername,
  setCategoriesUser,
  setLastname,
  setFirstname,
  setId,
  setWebsite,
  setEmail,
  setDescription,
  setUserInfos,
  setToken,
  logout,
  setFetchResponse,
} = userSlice.actions;

const thunkLogin =
  ({ emailOrUsername, password }) =>
  async (dispatch) => {
    try {
      let loginInput;
      if (emailOrUsername.includes('@')) {
        loginInput = { email: emailOrUsername };
      } else {
        loginInput = { username: emailOrUsername };
      }
      const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
        ...loginInput,
        password,
      });
      // saving id and token in the localstorage to persist the connection
      localStorage.setItem('userToken', JSON.stringify(response.data.token.accessToken));
      localStorage.setItem('userId', response.data.user.id);

      dispatch(setId(response.data.user.id));
      dispatch(setFirstname(response.data.user.firstname));
      dispatch(setLastname(response.data.user.lastname));
      dispatch(setEmail(response.data.user.email));
      dispatch(setUsername(response.data.user.username));

      dispatch(setFetchResponse(response.status));
    } catch (error) {
      dispatch(setFetchResponse(error.response.data));
    }
  };
export { thunkLogin };

export const thunkSignup =
  ({ username, email, password, confirmedPassword }) =>
  async (dispatch) => {
    const SignupForm = { username, email, password, confirmedPassword };
    dispatch(setSignupForm(SignupForm));
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/signup`, {
        username,
        email,
        password,
        confirmedPassword,
      });
      dispatch(setFetchResponse(response.statusText));
    } catch (error) {
      dispatch(setFetchResponse(error.response.data.message));
    }
  };

export const thunkUpdateProfil = (form, id) => async (dispatch) => {
  const { username, email, firstname, lastname, website, password } = form;
  try {
    const response = await axios.patch(`${REACT_APP_API_URL}/user/${id}`, {
      username,
      email,
      firstname,
      lastname,
      website,
      password,
    });

    dispatch(setFirstname(response.data.user.firstname));
    dispatch(setLastname(response.data.user.lastname));
    dispatch(setEmail(response.data.user.email));
    dispatch(setUsername(response.data.user.username));
    dispatch(setWebsite(response.data.user.website));
  } catch (error) {
    throw new Error();
  }
};

export const thunkGetUser =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/user/${userId}`, {
        headers: authHeader(),
      });
      dispatch(setUsername(response.data.username));
      dispatch(setEmail(response.data.email));
      dispatch(setFirstname(response.data.firstname));
      dispatch(setLastname(response.data.lastname));
      dispatch(setWebsite(response.data.website));
      dispatch(setId(response.data.id));
    } catch (error) {
      throw new Error();
    }
  };

export const thunkGetUserCategories =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/categories/user/${userId}`);
      dispatch(setCategoriesUser(response.data));
    } catch (error) {
      throw new Error();
    }
  };

export const thunkAddToolToUser =
  ({ userId, toolId }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/tools/user/${userId}`, {
        toolId,
      });
      // TODO mettre a jour le state dynamiquement

      dispatch(thunkFetchSidebarCategoriesAndTools());
    } catch (error) {
      throw new Error();
    }
  };

export const thunkRemoveToolToUser =
  ({ userId, toolId }) =>
  async (dispatch) => {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}/tools/user/${userId}`, {
        data: {
          toolId,
        },
      });
      // TODO mettre a jour le state dynamiquement

      dispatch(thunkFetchSidebarCategoriesAndTools());
    } catch (error) {
      throw new Error();
    }
  };
