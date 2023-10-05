import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    id: null,
    name: '',
    price: '',
    shortDescription: '',
    available: true,
    fullDescription: '',
    photo: [],
    createProductStatus: 'idle'
};

export const createProduct = createAsyncThunk(
  'product/createProduct', 
  async (product, { rejectWithValue }) => {
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

export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (id, { rejectWithValue }) => {

    const token = localStorage.getItem('access_token'); 
    if (!token) {
        return rejectWithValue('No access token found');
    }
    try {
      const response = await axios.get(`https://www.ishak-backender.org.kg/products/product/api/${id}/`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
        state.id = null;
        state.price = '';
        state.name = '';
        state.shortDescription = '';
        state.fullDescription = '';
        state.photo = [];
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.createProductStatus = 'loading';  
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductStatus = 'fulfilled';  
        state.id = action.payload.id;
        console.log('Product created:', action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductStatus = 'failed';  
        console.error('Product creation failed:', action.error);
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.createProductStatus = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.price = action.payload.price;
        state.shortDescription = action.payload.short_description;
        state.fullDescription = action.payload.description;
        state.photo = action.payload.photo;
        state.createProductStatus = 'fulfilled';
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.createProductStatus = 'failed';
      });
  },
});

export const { setProductField, setProductPhoto, clearProduct } = productSlice.actions;

export default productSlice.reducer;
