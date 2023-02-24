/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
    setToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    removeToolsUser: (state, action) => {
      state.tools = action.payload;
    },
    setSignupForm: (state, action) => {
      state.SignupForm = action.payload;
    },
    logout: () => ({}),
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
  setDescription,
  logout,
} = userSlice.actions;

export const thunkLogin =
  ({ email, password }) =>
    (dispatch) => {
      console.log('thunkLogin  email : ', email);
      console.log('thunkLogin  password : ', password);
      console.log('thunkLogin  FETCH USER LOGIN : ');
      const username = email;
      dispatch(setUsername(username));
    };

export const thunkSignup =
  ({ username, email, password, confirmedPassword }) =>
    (dispatch) => {
      const SignupForm = { username, email, password, confirmedPassword };
      dispatch(setSignupForm(SignupForm));
    };

