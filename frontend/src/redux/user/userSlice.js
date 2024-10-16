import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: localStorage.getItem('isLogedIn') === 'true',
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    mobile: '',
    image: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            let { first_name, last_name, gender, email, mobile, image } = action.payload;
            if (first_name) state.first_name = first_name;
            if (last_name) state.last_name = last_name;
            if (gender) state.gender = gender;
            if (email) state.email = email;
            if (mobile) state.mobile = mobile;
            if (image) state.image = image;
        },
        logdedInUser: (state, action) => {
            localStorage.setItem('type', 'user');
            localStorage.setItem('isLogedIn', 'true');
            let { first_name, last_name, gender, email, mobile, image } = action.payload;
            if (first_name) state.first_name = first_name;
            if (last_name) state.last_name = last_name;
            if (gender) state.gender = gender;
            if (email) state.email = email;
            if (mobile) state.mobile = mobile;
            if (image) state.image = image;
            state.isLoggedIn = true;

        },
        logdedOutUser: (state) => {
            localStorage.removeItem('type');
            localStorage.removeItem('isLogedIn');
            state.first_name = '';
            state.last_name = '';
            state.gender = '';
            state.email = '';
            state.mobile = '';
            state.image = '';
            state.isLoggedIn = false;

        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, logdedInUser, logdedOutUser } = userSlice.actions

export default userSlice.reducer