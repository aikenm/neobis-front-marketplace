import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    email: '',
    username: '',
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
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPasswordRepeat: (state, action) => {
            state.password_repeat = action.payload;
        },
        setUserExists: (state, action) => {
            state.userExists = action.payload;
        },
        resetUserExists: (state) => {
            state.userExists = false;
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
    }
});

export default signupSlice.reducer;
export const { 
    setEmail, 
    setUsername, 
    setPassword,
    setPasswordRepeat, 
    setUserExists,
    resetUserExists,
    nextStep,
    prevStep,
    resetSteps
} = signupSlice.actions;

export const registerUser = (userData) => async (dispatch, getState) => {
    try {
        const response = await axios.post('https://www.ishak-backender.org.kg/auth/register/', userData);
        if (response.status === 200 || response.status === 201) {
            dispatch(resetUserExists()); 
        }
    } catch (error) {
        if (error.response && error.response.data) {
            const { username, email } = error.response.data;
            if ((username && username.includes("user с таким username уже существует.")) || 
            (email && email.includes("user с таким email уже существует."))) {
                dispatch(setUserExists(true)); 
            } else {
                dispatch(setUserExists(false)); 
            }
        }
    }

    const state = getState();
    return state.signup.userExists;
};