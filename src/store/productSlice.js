import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  price: '',
  shortDescription: '',
  fullDescription: '',
  images: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setProductImages: (state, action) => {
      state.images = action.payload;
    },
    clearProduct: (state) => {
        state.price = '';
        state.name = '';
        state.shortDescription = '';
        state.fullDescription = '';
        state.images = [];
      }
  }
});

export const { setProductField, setProductImages, clearProduct } = productSlice.actions;

export default productSlice.reducer;
