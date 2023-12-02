import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {},
    isAdmin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }, 
        logout: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
            state.user = {}
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
        }
    }
})

export const {setAuth, setUser, setAdmin, logout} = authSlice.actions;
export default authSlice.reducer