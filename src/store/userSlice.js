import { createSlice } from '@reduxjs/toolkit';
//import axios from 'axios';

const initialState = {
    name: '',
    surname: '',
    login: '',
    dob: '',
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
            state.dob = action.payload.dob || state.dob;
            state.number = action.payload.number || state.number;
            state.email = action.payload.email || state.email;
        },
        logoutUser: (state) => {
            Object.assign(state, initialState);
        }
    }
});


export const { setUser, logoutUser, updateUser } = userSlice.actions;

// export const asyncUpdateUser = (userData) => {
//     return async dispatch => {
//         try {
//             const response = await axios.patch('/your/api/endpoint', userData);
//             if (response.status !== 200) {
//                 dispatch(updateUser(userData));
//             } else {
//                 console.log("Failed to update user data:", error);
//             }
//         } catch (error) {
//             console.error("Failed to update user data:", error);
//         }
//     }
// };

// Simulating an API call with a 2-second delay
export const asyncUpdateUser = (userData) => {
    return dispatch => {
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
    }
};


export default userSlice.reducer;
