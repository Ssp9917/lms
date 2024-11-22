import apiSlice from './apiSlice';

export const courseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourse: builder.query({
            query: () => 'course/getAllCourse',
        }),

        getCourseById: builder.query({
            query: (id) => `course/getCourseById/${id}`
        }),

        getSearchCourse: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                // Build qiery string
                let queryString = `course/getSearchCourse?query=${encodeURIComponent(searchQuery)}`

                // append cateogry 
                if (categories && categories.length > 0) {
                    const categoriesString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoriesString}`;
                }

                // Append sortByPrice is available
                if (sortByPrice) {
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
                }

                return {
                    url: queryString,
                    method: "GET",
                }
            }
        }),

        addCourse: builder.mutation({
            query: (course) => ({
                url: 'course/addCourse',
                method: 'POST',
                body: course,
            }),
        }),

        // toggel publish course
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `course/${courseId}?publish=${query}`,
                method: "PATCH",
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

        // remove lecture
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `course/lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Refetch_Lecture"],
        }),

        // get lecture by id
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `course/lecture/${lectureId}`,
                method: "GET",
            }),
        }),

        // getPublishedCourses courses
        getPublishedCourse: builder.query({
            query: () => ({
                url: 'course/getPublishedCourses',
                method: "GET"
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
    useGetPublishedCourseQuery,
    useGetSearchCourseQuery,
    usePublishCourseMutation,
    useRemoveLectureMutation
} = courseSlice;
