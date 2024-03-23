import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = 'https://camp-courses.api.kreosoft.space/'



export const userApi = createApi({

    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (body) => ({
                url: 'registration',
                method: 'POST',
                body,
            })
        }),
        authorizeUser: build.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            })
        }),
        logoutUser: build.mutation({
            query: (token) => ({
                url: 'logout',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        editUserProfile: build.mutation({
            query: ({body, token}) =>({
                url: 'profile',
                method: 'PUT',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getUserProfile: build.query({
            query: (token)=>({
                url: 'profile',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        }),
        getUserRoles: build.query({
            query: (token) => ({
                url: 'roles',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        })

    })
})

export const {
    useRegisterUserMutation,
    useGetUserCoursesQuery,
    useGetUserTeachingCoursesQuery,
    useAuthorizeUserMutation,
    useLogoutUserMutation,
    useGetUserProfileQuery,
    useEditUserProfileMutation,
    useGetUserRolesQuery,

} = userApi