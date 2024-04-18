import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = 'https://camp-courses.api.kreosoft.space/'



export const userApi = createApi({

    reducerPath: 'userApi',
    tagTypes: ['Profile'],
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
            }),
            invalidatesTags: [{ type: 'Profile', id: 'LIST' }]
        }),
        getUserProfile: build.query({
            query: (token)=>({
                url: 'profile',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result, id) => [{ type: 'Profile', id: 'LIST' }]
        }),
        getUserRoles: build.query({
            query: (token) => ({
                url: 'roles',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getAllUsers: build.query({
            query: (token) =>({
                url: "users",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        })

    })
})

export const {
    useRegisterUserMutation,
    useAuthorizeUserMutation,
    useLogoutUserMutation,
    useGetUserProfileQuery,
    useEditUserProfileMutation,
    useGetUserRolesQuery,
    useGetAllUsersQuery

} = userApi