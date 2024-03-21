import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        login: null,
        roles: {
            isTeacher: false,
            isStudent: false,
            isAdmin: false
        }

    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        clearToken(state) {
            state.token = null
        },
        setRoles(state, action){
            state.roles.isAdmin = action.payload.isAdmin
            state.roles.isStudent = action.payload.isStudent
            state.roles.isTeacher = action.payload.isTeacher
        },
        setLogin(state, action){
            state.login = action.payload
        }
    }
})

export const { setToken, clearToken, setRoles, setLogin } = authSlice.actions
export const selectToken = (state) => state.auth.token
export const selectRoles = (state) => state.auth.roles
export const selectLogin = (state) => state.auth.login

export default authSlice.reducer