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
  },
});

export default userSlice.reducer;
export const { setUsername } = userSlice.actions;

const thunkLogin =
  ({ email, password }) =>
  (dispatch) => {
    console.log('thunkLogin  email : ', email);
    console.log('thunkLogin  password : ', password);
    console.log('thunkLogin  FETCH USER LOGIN : ');
    const username = email;
    dispatch(setUsername(username));
  };
export { thunkLogin };
