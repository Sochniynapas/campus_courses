import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react/";

const BASE_URL = 'https://camp-courses.api.kreosoft.space/'

export const coursesApi = createApi({
    reducerPath: "cousesApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getListOfCourses: build.query({
            query: ({token, id}) =>({
                url: `groups/${id}`,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })

})

export const {useGetListOfCoursesQuery} = coursesApi