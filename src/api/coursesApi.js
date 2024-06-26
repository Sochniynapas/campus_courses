import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const BASE_URL = 'https://camp-courses.api.kreosoft.space/'

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    tagTypes: ['Courses', 'ConcreteCourse'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getListOfCourses: build.query({
            query: ({ token, id }) => ({
                url: `groups/${id}`,
                headers: {
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
        getUserCourses: build.query({
            query: ({token}) => ({
                url: 'courses/my',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Courses' }, id)),
                    { type: 'Courses', id: 'LIST' }
                ] : [
                    [{ type: 'Courses', id: 'LIST' }]
                ]
        }),
        getUserTeachingCourses: build.query({
            query: ({token}) => ({
                url: 'courses/teaching',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Courses' }, id)),
                    { type: 'Courses', id: 'LIST' }
                ] : [
                    [{ type: 'Courses', id: 'LIST' }]
                ]
        }),
        getConcreteCourse: build.query({
            query: ({ token, id }) => ({
                url: `courses/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        getCoursePage: build.query({
            query: ({ token, id }) => ({
                url: `courses/${id}/details`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: (result, id) => [{ type: 'ConcreteCourse', id: 'LIST' }]

        }),
        createCourse: build.mutation({
            query: ({ token, body, id }) => ({
                url: `groups/${id}`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }]
        }),
        editCoursesAnnotationsAndRequirements: build.mutation({
            query: ({ token, id, data }) => ({
                url: `courses/${id}/requirements-and-annotations`,
                method: "PUT",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        editCourse: build.mutation({
            query: ({ token, body, id }) => ({
                url: `courses/${id}`,
                body: body,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        editCoursesStatus: build.mutation({
            query: ({ token, body, id }) => ({
                url: `courses/${id}/status`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        addTeacherOnCourse: build.mutation({
            query: ({ token, body, id }) => ({
                url: `courses/${id}/teachers`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        editStudentMark: build.mutation({
            query: ({ token, body, courseId, studentId }) => ({
                url: `courses/${courseId}/marks/${studentId}`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        createNotification: build.mutation({
            query: ({ token, body, id }) => ({
                url: `courses/${id}/notifications`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        signUpForACourse: build.mutation({
            query: ({ token, id }) => ({
                url: `courses/${id}/sign-up`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        changeUserStatus: build.mutation({
            query: ({ token, body, courseId, studentId}) => ({
                url: `courses/${courseId}/student-status/${studentId}`,
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'ConcreteCourse', id: 'LIST' }]
        }),
        deleteCourse: build.mutation({
            query: ({ token, id }) => ({
                url: `courses/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }]
        })
    })

})

export const {
    useGetListOfCoursesQuery,
    useCreateCourseMutation,
    useGetConcreteCourseQuery,
    useGetCoursePageQuery,
    useEditCoursesAnnotationsAndRequirementsMutation,
    useEditCourseMutation,
    useEditCoursesStatusMutation,
    useAddTeacherOnCourseMutation,
    useEditStudentMarkMutation,
    useCreateNotificationMutation,
    useSignUpForACourseMutation,
    useChangeUserStatusMutation,
    useDeleteCourseMutation,
    useGetUserCoursesQuery,
    useGetUserTeachingCoursesQuery
} = coursesApi