/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'jojoLesBiscotos',
  avatar: 'https://i.pinimg.com/originals/97/00/74/9700742a4a213d0f181f7d31fcd63caf.jpg',
  lastname: 'Kujo',
  firstname: 'Jotaro',
  website: 'https://jjba.fandom.com/fr/wiki/Jotaro_Kujo',
  description:
    'Jotaro is introduced as a rough delinquent, but he has a gentle heart, and is loyal to those he likes.',
  email: 'kujo.jotaro@stardust.com',
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
