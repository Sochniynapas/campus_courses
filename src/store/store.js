import { configureStore } from "@reduxjs/toolkit";
import { userApi } from '../api/userApi';
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer

    },
    middleware: (getDefaulMuddlware) => getDefaulMuddlware().concat(userApi.middleware)  
    
});