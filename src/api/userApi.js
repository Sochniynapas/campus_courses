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
        }),
        getUserCourses: build.query({
            query: (token) => ({
                url: 'courses/my',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getUserTeachingCourses: build.query({
            query: (token) => ({
                url: 'courses/teaching',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })      
        })

    })
})  

export const {useRegisterUserMutation, useGetUserCoursesQuery, useGetUserTeachingCoursesQuery} = userApi;