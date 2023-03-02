import { configureStore } from '@reduxjs/toolkit';

import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import searchReducer from '../features/search/searchSlice';
import toolsReducer from '../features/tools/toolsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    search: searchReducer,
    tools: toolsReducer,
    user: userReducer,
  },
});
