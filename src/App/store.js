import { configureStore } from '@reduxjs/toolkit';

import applicationReducer from '../features/application/applicationSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import githubReducer from '../features/github/githubSlice';
import searchReducer from '../features/search/searchSlice';
import toolsReducer from '../features/tools/toolsSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    application: applicationReducer,
    bookmarks: bookmarksReducer,
    github: githubReducer,
    search: searchReducer,
    tools: toolsReducer,
    user: userReducer,
  },
});
