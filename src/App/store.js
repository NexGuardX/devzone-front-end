import { configureStore } from '@reduxjs/toolkit';

import applicationReducer from '../features/application/applicationSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import searchReducer from '../features/search/searchSlice';
import toolsReducer from '../features/tools/toolsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    application: applicationReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
    tools: toolsReducer,
    user: userReducer,
  },
});
