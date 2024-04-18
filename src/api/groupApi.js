import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'https://camp-courses.api.kreosoft.space/'

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Groups'],
    endpoints: (build) => ({
        getGroups: build.query({
            query: (token) => ({
                url: 'groups',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Groups' }, id)),
                    { type: 'Groups', id: 'LIST' }
                ] : [
                    [{ type: 'Groups', id: 'LIST' }]
                ]
        }),
        putGroupName: build.mutation({
            query: ({ body, token, id }) => ({
                url: `groups/${id}`,
                method: 'PUT',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Groups', id: 'LIST' }]
        }),
        deleteGroup: build.mutation({
            query: ({ token, id }) => ({
                url: `groups/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Groups', id: 'LIST' }]
        }),
        createGroup: build.mutation({
            query: ({ token, name }) => ({
                url: `groups`,
                method: 'POST',
                body: { name },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Groups', id: 'LIST' }]
        }),
    })
})

export const {
    useGetGroupsQuery,
    usePutGroupNameMutation,
    useDeleteGroupMutation,
    useCreateGroupMutation,
} = groupApi