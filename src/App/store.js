import { configureStore } from '@reduxjs/toolkit';
import toolsReducer from '../features/tools/toolsSlice';
import authReducer from '../features/user/authSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
    auth: authReducer,
  },
});
