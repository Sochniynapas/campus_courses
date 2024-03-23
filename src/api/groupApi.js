import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'https://camp-courses.api.kreosoft.space/'

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getGroups: build.query({
            query: (token) => ({
                url: 'groups',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        })
    })
})

export const {useGetGroupsQuery} = groupApi