/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  numberOfresults: 0,
  search: '',
  results: [],
  isOpen: false,
  searchTools: '',
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
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setNumberOfResults: (state, action) => {
      state.numberOfresults = action.payload;
    },
    setSearchTools: (state, action) => {
      state.searchTools = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { setResults, setOpenModal, setSearchTools, setSearch, setNumberOfResults } =
  searchSlice.actions;

const thunkSOFSearch = (searchValue) => async (dispatch) => {
  dispatch(setResults([]));
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&accepted=True&title=${searchValue}&site=stackoverflow&filter=!6Wfm_gUEKNo4Q`
    );
    dispatch(setResults(response.data.items));
    dispatch(setNumberOfResults(response.data.total));
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const thunkNPMSearch = (searchValue) => async (dispatch) => {
  dispatch(setResults([]));
  try {
    const response = await axios.get(`https://api.npms.io/v2/search?q=${searchValue}`);
    dispatch(setResults(response.data.results));
    console.log(response.data.results);
  } catch (error) {
    console.log(error);
  }
};

export { thunkSOFSearch, thunkNPMSearch };
