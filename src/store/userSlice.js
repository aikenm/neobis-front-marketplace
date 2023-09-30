import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const initialState = {
    avatar: null,
    first_name: '',
    last_name: '',
    username: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    loginStatus: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
            state.loginStatus = true;
        },
        updateUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        logoutUser: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const { setUser, logoutUser, updateUser } = userSlice.actions;

export const loginUser = (loginData) => async (dispatch) => {
    try {
        const response = await axios.post('http://207.154.198.7:8000/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json'      
            },
        });
        
        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
            dispatch(setUser({ username: loginData.username, email: ''}));

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

export const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();
    const expiryDate = new Date(decodedToken.exp * 1000);
    return currentDate > expiryDate;
};

export const refreshToken = async () => {
    try {
        const response = await axios.post('http://207.154.198.7:8000/auth/token/refresh/', {
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
            url: 'http://207.154.198.7:8000/auth/profile',
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

export const sendPhoneNumber = (phone_number) => async (dispatch) => {
    try {
      const response = await axios.put('http://207.154.198.7:8000/auth/code-send', {
        phone_number
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
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
      const response = await axios.post('http://207.154.198.7:8000/auth/code-check', {
        verification_code
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
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
