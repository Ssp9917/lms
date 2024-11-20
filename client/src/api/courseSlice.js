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
            query: (lecture) => ({
                url: 'course/addLecture',
                method: 'POST',
                body: lecture,
            }),
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
   useCreateLectureMutation
} = courseSlice;
