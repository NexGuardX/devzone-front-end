/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toastMessage: '',
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setToastMessage: (state, action) => {
      const { title, status } = action.payload;
      state.toastMessage = action.payload
        ? {
            title,
            status,
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          }
        : null;
    },
  },
});

export default applicationSlice.reducer;
export const { setToastMessage } = applicationSlice.actions;
