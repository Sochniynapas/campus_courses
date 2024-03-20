import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const BASE_URL = 'https://camp-courses.api.kreosoft.space/'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints:(build) =>({
        registerUser: build.mutation({
            query: (body) => ({
                url: 'registration',
                method: 'POST',
                body,
            })
        })
    })
})  

export const {useRegisterUserMutation} = userApi;