/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  results: [],
  isOpen: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.isOpen = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { setResults, setOpenModal } = searchSlice.actions;

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
