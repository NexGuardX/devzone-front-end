import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import toolsReducer from '../features/tools/toolsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
    search: searchReducer,
  },
});
