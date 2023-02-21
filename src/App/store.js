import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
