import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: '',
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
        logoutUser: (state) => {
            // Reset user data to its initial state
            Object.assign(state, initialState);
        }
    }
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
