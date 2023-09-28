import { createSlice } from '@reduxjs/toolkit';
//import axios from 'axios';

const initialState = {
    name: '',
    surname: '',
    login: '',
    dob: '',
    number: '',
    email: '',
    avatar: null
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
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        logoutUser: (state) => {
            Object.assign(state, initialState);
        }
    }
});


export const { setUser, logoutUser, updateUser, updateAvatar } = userSlice.actions;

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
                    // handle error
                }
            }, 2000);
            
            // Uncomment below lines once you have the endpoint ready
            // const response = await axios.patch('/your/api/endpoint', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            
            // if (response.status === 200) {
            //     dispatch(updateUser(userData));
            // } else {
            //     // handle error
            // }
        } catch (error) {
            console.error("Failed to update user data:", error);
            // handle error
        }
    }
};



export default userSlice.reducer;
