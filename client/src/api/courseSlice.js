import apiSlice from './apiSlice';

export const courseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourse: builder.query({
            query: () => 'course/getAllCourse',
        }),

        getCourseById: builder.query({
            query: (id) => `course/getCourseById/${id}`
        }),

        addCourse: builder.mutation({
            query: (course) => ({
                url: 'course/addCourse',
                method: 'POST',
                body: course,
            }),
        }),

        // Edit course mutation
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `course/editCourse/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        // create lecture
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `course/${courseId}/addLecture`,
                method: 'POST',
                body: { lectureTitle },
            }),
        }),

        // get all Lectures
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `course/${courseId}/lecture`,
                method: "GET",
            }),
            // providesTags: ["Refetch_Lecture"],
        }),

        // get lecture by id
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `course/lecture/${lectureId}`,
                method: "GET",
            }),
        }),

        // getPublishedCourses courses
        getPublishedCourse:builder.query({
            query:()=>({
                url:'course/getPublishedCourses',
                method:"GET"
            })
        }),

        // edit lecture
        editLecture: builder.mutation({
            query: ({ courseId, lectureId,
                lectureTitle,
                videoInfo,
                isPreviewFree,
            }) => ({
                url: `/course/${courseId}/lecture/${lectureId}`,
                method: "PUT",
                body: {
                    lectureTitle,
                    videoInfo,
                    isPreviewFree,
                }
            })
        })

        // deleteCategory: builder.mutation({
        //     query: (id) => ({
        //         url: `category/deleteCategory/${id}`, // Make sure this URL is correct
        //         method: 'DELETE',
        //     }),
        // }),
    }),
});

export const {
    useGetAllCourseQuery,
    useAddCourseMutation,
    useGetCourseByIdQuery,
    useEditCourseMutation,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useGetLectureByIdQuery,
    useEditLectureMutation,
    useGetPublishedCourseQuery
} = courseSlice;
