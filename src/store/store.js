import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/userSlice';
import signupReducer from '../store/signupSlice';
import productReducer from '../store/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    product: productReducer
  },
});

export default store;
