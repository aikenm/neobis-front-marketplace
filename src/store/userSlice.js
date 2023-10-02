import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();
    const expiryDate = new Date(decodedToken.exp * 1000);
    return currentDate > expiryDate;
};

const initialState = {
    avatar: null,
    first_name: '',
    last_name: '',
    username: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    loginStatus: !!localStorage.getItem('access_token') && !isTokenExpired(localStorage.getItem('access_token'))
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEntireUser: (state, action) => {
            state.loginStatus = true;
            Object.assign(state, action.payload);
        },
        updateUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        logoutUser: (state) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            state.loginStatus = false;
            Object.assign(state, initialState);
        }
    }
});

export const {setEntireUser, logoutUser, updateUser } = userSlice.actions;

export const loginUser = (loginData) => async (dispatch) => {
    try {
        const response = await axios.post('http://157.230.18.205:8000/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);

            await dispatch(fetchAndSetUser());

            return 'LOGIN_SUCCESSFUL';
        }
    } catch (error) {
        console.error("Error during login:", error);
        if (error.response && error.response.status === 400) {
            return 'LOGIN_FAILED';
        }
    }
    return 'LOGIN_FAILED';
};

export const fetchAndSetUser = createAsyncThunk(
    'user/fetchAndSetUser',
    async (_, { dispatch }) => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
        const response = await axios.get('http://157.230.18.205:8000/auth/profile-view', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        dispatch(setEntireUser(response.data));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  );

export const refreshToken = async () => {
    try {
        const response = await axios.post('http://157.230.18.205:8000/auth/token/refresh/', {
            refresh: localStorage.getItem('refresh_token')
        });
        console.log(response);
        localStorage.setItem('access_token', response.data.access);
    } catch (error) {
        console.error("Failed to refresh token:", error);
    }
};

export const apiCallWithTokenRefresh = async (axiosConfig) => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedAccessToken && isTokenExpired(storedAccessToken) && storedRefreshToken) {
        await refreshToken();
    }

    if (storedAccessToken) {
        axios.defaults.headers['Authorization'] = `Bearer ${storedAccessToken}`;
    }

    return axios(axiosConfig);
};

export const asyncUpdateUser = (userData, imageFile) => async (dispatch) => {
    const formData = new FormData();
    for (let key in userData) {
        formData.append(key, userData[key]);
    }
    if (imageFile) {
        formData.append('avatar', imageFile); 
    }
    try {
        const response = await apiCallWithTokenRefresh({
            method: 'put',
            url: 'http://157.230.18.205:8000/auth/profile-update',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.status === 200) {
            dispatch(updateUser(response.data));
        }
    } catch (error) {
        console.error("Failed to update user data:", error);
    }
};

const token = localStorage.getItem('access_token');  
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

export const sendPhoneNumber = (phone_number) => async (dispatch) => {
    try {
      const response = await axios.put('http://157.230.18.205:8000/auth/code-send', {
        phone_number
      }, {
        headers: headers
      });
  
      if (response.status === 201) {
        return 'CODE_SENT';
      }
    } catch (error) {
      console.error("Failed to send code:", error);
      return 'CODE_SEND_FAILED';
    }
  };

export const verifyCode = (verification_code, enteredNumber) => async (dispatch) => {
    try {
      const response = await axios.post('http://157.230.18.205:8000/auth/code-check', {
        verification_code
      }, {
          headers: headers
      });
  
      if (response.status === 200) {
        dispatch(updateUser({ phone_number: enteredNumber }));
        return 'CODE_VERIFIED';
      }
    } catch (error) {
      console.error("Failed to verify code:", error);
      return 'CODE_VERIFICATION_FAILED';
    }
  };

export default userSlice.reducer;