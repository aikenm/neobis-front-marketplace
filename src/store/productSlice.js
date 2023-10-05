import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: '',
  price: '',
  shortDescription: '',
  available: true,
  fullDescription: '',
  photo: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setProductPhoto: (state, action) => {
      state.photo = action.payload;
    },
    clearProduct: (state) => {
        state.price = '';
        state.name = '';
        state.shortDescription = '';
        state.fullDescription = '';
        state.photo = [];
      }
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state, action) => {
        console.log('Product created:', action.payload);
});
},
});

export const { setProductField, setProductPhoto, clearProduct } = productSlice.actions;

export const createProduct = createAsyncThunk('product/createProduct', async (product, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token'); 
    if (!token) {
        return rejectWithValue('No access token found');
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.fullDescription);
    formData.append('short_description', product.shortDescription);
    formData.append('available', product.available);
    formData.append('price', product.price);

    product.photo.forEach((photo) => {
        formData.append('photo', photo);  
    });

    try {
        const response = await axios.post('https://www.ishak-backender.org.kg/products/product/api/', formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        return rejectWithValue(error.response.data);
    }
});


export default productSlice.reducer;
