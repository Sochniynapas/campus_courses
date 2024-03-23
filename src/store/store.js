import { configureStore } from "@reduxjs/toolkit";
import { userApi } from '../api/userApi';
import authReducer from './slice/authSlice'
import { groupApi } from "../api/groupApi";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, groupApi.middleware)

});