import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const BASE_URL = 'https://camp-courses.api.kreosoft.space/'

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    tagTypes: ['Courses'],
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getListOfCourses: build.query({
            query: ({token, id}) =>({
                url: `groups/${id}`,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Courses' }, id)),
                    { type: 'Courses', id: 'LIST' }
                ] : [
                    [{ type: 'Courses', id: 'LIST' }]
                ]
        }),
        createCourse: build.mutation({
            query: ({token, body, id}) =>({
                url: `groups/${id}`,
                body: body,
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }]
        }),
        getConcreteCourse: build.query({
            query: ({token, id}) = {
                url: `courses/${id}`,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        })
    })

})

export const {
    useGetListOfCoursesQuery,
    useCreateCourseMutation,
    useGetConcreteCourseQuery
} = coursesApi