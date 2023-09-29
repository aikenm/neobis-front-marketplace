import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    name: '',
    surname: '',
    username: '',
    dob: '',
    number: '',
    email: '',
    avatar: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        updateUser: (state, action) => {
            state.name = action.payload.name || state.name;
            state.surname = action.payload.surname || state.surname;
            state.username = action.payload.username || state.username;
            state.dob = action.payload.dob || state.dob;
            state.number = action.payload.number || state.number;
            state.email = action.payload.email || state.email;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        logoutUser: (state) => {
            Object.assign(state, initialState);
        }
    }
});


export const { setUser, setLoginStatus, logoutUser, updateUser, updateAvatar } = userSlice.actions;

export const loginUser = (loginData) => async (dispatch) => {
    try {
        console.log("Data in loginUser action:", loginData);
        const response = await axios.post('http://207.154.198.7:8000/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json'      
            },
        });
        
        if (response.status === 200) {
            dispatch(setUser({ username: loginData.username, email: '' }));
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


export const asyncUpdateUser = (userData, imageFile) => {
    return async dispatch => {
        const formData = new FormData();
        
        for (let key in userData) {
            formData.append(key, userData[key]);
        }

        if (imageFile) {
            formData.append('avatar', imageFile); 
        }

        try {
            // Simulating an API call with a 2-second delay
            setTimeout(() => {
                const simulatedResponse = {
                    status: 200,
                };

                if (simulatedResponse.status === 200) {
                    dispatch(updateUser(userData));
                } else {
                    console.error("Failed to update user data: simulated error");
                }
            }, 2000);
            
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    }
};

export default userSlice.reducer;
