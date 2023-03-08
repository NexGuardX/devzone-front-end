/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
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
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToolsUser: (state, action) => {
      state.tools = action.payload;
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
    logout: () => ({}),
    setFetchResponse: (state, action) => {
      state.response = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  setSignupForm,
  setUsername,
  setToolsUser,
  removeToolsUser,
  setLastname,
  setFirstname,
  setWebsite,
  setEmail,
  setId,
  setToken,
  setDescription,
  logout,
  setFetchResponse,
} = userSlice.actions;

export const thunkLogin =
  ({ username, email, password }) =>
    async (dispatch) => {
      try {
        const response = await axios.post(`http://localhost:8080/login`, {
          username,
          email,
          password,
        });
        dispatch(setId(response.data.user.id));
        dispatch(setFirstname(response.data.user.firstname));
        dispatch(setLastname(response.data.user.lastname));
        dispatch(setEmail(response.data.user.email));
        dispatch(setUsername(response.data.user.username));
        dispatch(setToken(response.data.token.accessToken));
        dispatch(setFetchResponse(response.status));
      } catch (error) {
        dispatch(setFetchResponse(error.response.data));
      }
    };

export const thunkSignup =
  ({ username, email, password, confirmedPassword }) =>
    async (dispatch) => {
      const SignupForm = { username, email, password, confirmedPassword };
      dispatch(setSignupForm(SignupForm));
      try {
        const response = await axios.post(`http://localhost:8080/signup`, {
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
