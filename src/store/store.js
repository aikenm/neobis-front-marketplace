import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/userSlice';
import signupReducer from '../store/signupSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer
  },
});

export default store;
