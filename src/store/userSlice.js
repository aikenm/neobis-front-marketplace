import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    surname: '',
    login: '',
    number: '',
    email: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.login = action.payload.login;
            state.email = action.payload.email;
        },
        updateUser: (state, action) => {
            state.name = action.payload.name || state.name;
            state.surname = action.payload.surname || state.surname;
            state.login = action.payload.login || state.login;
            state.number = action.payload.number || state.number;
            state.email = action.payload.email || state.email;
        },
        logoutUser: (state) => {
            // Reset user data to its initial state
            Object.assign(state, initialState);
        }
    }
});

export default userSlice.reducer;
export const { setUser, logoutUser, updateUser } = userSlice.actions;
