// signupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action for checking user existence
export const checkUserExists = createAsyncThunk('signup/checkUser', async (user) => {
    // Mock API call to check user - replace with actual API call
    const response = await axios.post('/api/check-user', user);
    return response.data;
});

const initialState = {
    email: '',
    login: '',
    password: '',
    password_repeat: '',
    step: 1,
    userExists: false
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPasswordRepeat: (state, action) => {
            state.password_repeat = action.payload;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            if (state.step > 1) state.step -= 1;
        },
        resetSteps: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkUserExists.fulfilled, (state, action) => {
            state.userExists = action.payload.exists;
            if(!state.userExists) {
                state.step += 1;
            }
        });
    }
});

export default signupSlice.reducer;
export const { 
    setEmail, 
    setLogin, 
    setPassword,
    setPasswordRepeat, 
    nextStep,
    prevStep,
    resetSteps
} = signupSlice.actions;
