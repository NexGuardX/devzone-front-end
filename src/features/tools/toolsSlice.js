/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import categories from '../../data/allTools';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  tools: [],
  categories: [],
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setCategoriesWithTools: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default toolsSlice.reducer;

export const { setCategoriesWithTools } = toolsSlice.actions;

export const thunkCategoriesWithTools = () => async (dispatch) => {
  // dispatch(setCategoriesWithTools(categories));
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/categories`);
    dispatch(setCategoriesWithTools(response.data));
  } catch (error) {
    throw new Error();
  }
};
