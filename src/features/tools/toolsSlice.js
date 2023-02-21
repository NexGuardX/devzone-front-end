import { createSlice } from '@reduxjs/toolkit';

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
  ],
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
});

export default toolsSlice.reducer;
