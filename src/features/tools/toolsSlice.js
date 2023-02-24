/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tools: [
    {
      id: 1,
      name: 'NPM search',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/2560px-Npm-logo.svg.png',
    },
    {
      id: 2,
      name: 'Playground JS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png',
    },
    {
      id: 3,
      name: 'News',
      logo: 'https://cdn-icons-png.flaticon.com/512/21/21601.png',
    },
    {
      id: 4,
      name: 'Stack Overflow',
      logo: 'https://www.logo.wine/a/logo/Stack_Overflow/Stack_Overflow-Logo.wine.svg',
    },
  ],
  results: [],
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export default toolsSlice.reducer;

export const { setResults } = toolsSlice.actions;

const thunkSOFSearch = (searchValue) => async (dispatch) => {
  dispatch(setResults([]));
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&accepted=True&title=${searchValue}&site=stackoverflow`
    );
    dispatch(setResults(response.data.items));
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { thunkSOFSearch };
