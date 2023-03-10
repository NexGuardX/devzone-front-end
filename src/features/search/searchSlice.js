/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  numberOfresults: 0,
  search: '',
  results: [],
  isOpen: false,
  isLoaded: true,
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
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const {
  setResults,
  setOpenModal,
  setSearchTools,
  setSearch,
  setNumberOfResults,
  setIsLoaded,
} = searchSlice.actions;

const thunkSOFSearch = (searchValue) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&accepted=True&title=${searchValue}&site=stackoverflow&filter=!6Wfm_gUEKNo4Q`
    );
    dispatch(setResults(response.data.items));
    dispatch(setNumberOfResults(response.data.total));
    dispatch(setIsLoaded(true));
  } catch (error) {
    throw new Error();
  }
};

const thunkNPMSearch = (searchValue) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.npms.io/v2/search?q=${searchValue}`);
    dispatch(setResults(response.data.results));
    dispatch(setNumberOfResults(response.data.total));
    dispatch(setIsLoaded(true));
    console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const thunkGHSearch = (searchValue) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.github.com/search/repositories?q=${searchValue}`);
    dispatch(setNumberOfResults(response.data.total_count));
    dispatch(setResults(response.data.items));
    dispatch(setIsLoaded(true));
  } catch (error) {
    throw new Error();
  }
};

export { thunkSOFSearch, thunkNPMSearch, thunkGHSearch };
