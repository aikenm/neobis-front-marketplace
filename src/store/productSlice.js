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
    createProductStatus: 'idle',
    like_count: null, 
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
    try {
      const response = await axios.get(`https://www.ishak-backender.org.kg/products/product-list/${id}/`, {
        headers: {
          'accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeProduct = createAsyncThunk(
    'product/likeProduct',
    async (id, { rejectWithValue }) => {
      const token = localStorage.getItem('access_token');
      const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
        };
  
        try {
            const response = await axios.post(`https://www.ishak-backender.org.kg/products/like/${id}/`, {}, { headers });
            if (response.data.message === "Product already liked") {
                throw new Error("Product already liked");
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message === "Product already liked") {
                return rejectWithValue({ message: "Product already liked", originalError: error.response.data });
            }
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: error.message });
            }
        }
        
    }
  );
  
  export const unlikeProduct = createAsyncThunk(
    'product/unlikeProduct',
    async (productId, { rejectWithValue }) => {
      const token = localStorage.getItem('access_token');
      const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
  
      try {
        const response = await axios.delete(`https://www.ishak-backender.org.kg/products/unlike/${productId}/`, { headers });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
      const token = localStorage.getItem('access_token'); 
      const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
  
      try {
        const response = await axios.delete(`https://www.ishak-backender.org.kg/products/product/api/${id}/`, { headers });
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
    },
    resetCreateProductStatus: (state) => {
        state.createProductStatus = 'idle';
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
        state.like_count = action.payload.like_count;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.createProductStatus = 'failed';
      })


      .addCase(likeProduct.fulfilled, (state, action) => {
        console.log('Product liked:', action.payload);
      })
      .addCase(likeProduct.rejected, (state, action) => {
        console.error('Error liking product:', action.error);
      })


      .addCase(unlikeProduct.fulfilled, (state, action) => {
        console.log('Product unliked:', action.payload);
      })
      .addCase(unlikeProduct.rejected, (state, action) => {
        console.error('Error unliking product:', action.error);
      })

      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log('Product deleted:', action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.error('Error deleting product:', action.error);
      });
  },
});

export const { setProductField, setProductPhoto, clearProduct, resetCreateProductStatus } = productSlice.actions;

export default productSlice.reducer;
